"use client";

import styles from "./page.module.css";
import Image from "next/image";
import { AiFillFileText } from "react-icons/ai";
import { RiPlantFill } from "react-icons/ri";
import { FaHandshake } from "react-icons/fa6";
import { GoChevronDown } from "react-icons/go";
import Footer from "../../components/footer/page.js";
import { useState } from 'react';
import { LuLoaderCircle } from "react-icons/lu";
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../AuthContext';

export default function Sales() {
    const [selectedPlan, setSelectedPlan] = useState("yearly" || "monthly");
    const [openIndex, setOpenIndex] = useState(null);
    const [loading, setLoading] = useState(false);
    const { currentUser } = useAuth();

    const handleCheckout = async (priceId) => {
        if (!currentUser) {
            alert('Please log in first!');
            return;
        }
        try {
            const docRef = await addDoc(
                collection(db, "customers", currentUser.uid, "checkout_sessions"),
                {
                    price: priceId,
                    success_url: window.location.origin + '/pages/for-you',
                    cancel_url: window.location.origin + '/pages/sales',
                }
            );
            onSnapshot(docRef, (snap) => {
                const data = snap.data();
                if (data && data.url) {
                    setLoading(true);
                    window.location.assign(data.url);
                } else if (data && data.error) {
                    console.error(`Checkout session failure: ${data.error.message}`);
                }
            });
        } catch (err) {
            console.error('Error initializing checkout session:', err);
        }
    };

    const toggleItem = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const FAQs = [
        {title: "How does the free 7-day trial work?",
            content: "Begin your complimentary 7-day trial with a Summarist annual membership. You are under no obligation to continue your subscription, and you will only be billed when the trial period expires. With Premium access, you can learn at your own pace and as frequently as you desire, and you may terminate your subscription prior to the conclusion of the 7-day free trial."},

        {title: "Can I switch subscriptions from monthly to yearly, or yearly to monthly?",
            content: "While an annual plan is active, it is not feasible to switch to a monthly plan. However, once the current month ends, transitioning from a monthly plan to an annual plan is an option."},

        {title: "What's included in the Premium plan?",
            content: "Premium membership provides you with the ultimate Summarist experience, including unrestricted entry to many best-selling books high-quality audio, the ability to download titles for offline reading, and the option to send your reads to your Kindle."},
            
        {title: 'Can I cancel during my trial or subscription?',
            content: 'You will not be charged if you cancel your trial before its conclusion. While you will not have complete access to the entire Summarist library, you can still expand your knowledge with one curated book per day.'}
    ];

    return (
        <>
        <div className={styles.sales__container}>
            <div className={styles["sales__header--wrapper"]}>
                <div className={styles.sales__header}>
                    <div className={styles.sales__title}>Get unlimited access to many amazing books to read</div>
                    <div className={styles.sales__subtitle}>Turn ordinary moments into amazing learning opportunities</div>
                    <figure className={styles["sales__image--wrapper"]}>
                        <Image className={styles["sales__image"]} src="/pricing-top.png" alt="sales image" width={860} height={722} />
                    </figure>
                </div>
            </div>
            <div className={styles.sales__row}>
                <div className={styles["sales__container--main"]}>
                    <div className={styles["sales__features--wrapper"]}>
                        <div className={styles["sales__feature"]}>
                            <figure className={styles["sales__feature--icon"]}>
                                <AiFillFileText className={styles["sales__feature--icon-img"]} />
                            </figure>
                            <div className={styles["sales__feature--text"]}><b>Key ideas in few min</b> with many books to read</div>
                        </div>
                        <div className={styles["sales__feature"]}>
                            <figure className={styles["sales__feature--icon"]}>
                                <RiPlantFill className={styles["sales__feature--icon-img"]} />
                            </figure>
                            <div className={styles["sales__feature--text"]}><b>3 million</b> people growing with Summarist everyday</div>
                        </div>
                        <div className={styles["sales__feature"]}>
                            <figure className={styles["sales__feature--icon"]}>
                                <FaHandshake className={styles["sales__feature--icon-img"]} />
                            </figure>
                            <div className={styles["sales__feature--text"]}><b>Precise recommendations</b> collections curated by experts</div>
                        </div>                     
                    </div>
                    <div className={styles.section__title}>Choose the plan that fits you</div>
                    <div className={`${styles.sales__card} ${selectedPlan === "yearly" ? styles["sales__card--active"] : ""}`} onClick={() => setSelectedPlan("yearly")}>
                        <div
                        className={styles["sales__card--circle"]}

                        >
                            <div className={selectedPlan === "yearly" ? styles["sales__card--dot"] : ""}></div>
                        </div>
                        <div className={styles["sales__card--content"]}>
                            <div className={styles["sales__card--title"]}>Premium Plus Yearly</div>
                            <div className={styles["sales__card--price"]}>$99.99/year</div>
                            <div className={styles["sales__card--text"]}>7-day free trial included</div>
                        </div>
                    </div>
                    <div className={styles["sales__card--separator"]}>
                        <div className={styles["sales__separator--text"]}>or</div>
                    </div>
                    <div className={`${styles.sales__card} ${selectedPlan === "monthly" ? styles["sales__card--active"] : ""}`} onClick={() => setSelectedPlan("monthly")}>
                        <div className={styles["sales__card--circle"]}>
                            <div className={selectedPlan === "monthly" ? styles["sales__card--dot"] : ""}></div>
                        </div>
                        <div className={styles["sales__card--content"]}>
                            <div className={styles["sales__card--title"]}>Premium Monthly</div>
                            <div className={styles["sales__card--price"]}>$9.99/month</div>
                            <div className={styles["sales__card--text"]}>No trial included</div>
                        </div>
                    </div>
                    <div className={styles.sales__begin}>
                        <span className={styles.button__wrapper}>
                            <button
                            className={styles.button}
                            onClick={() => handleCheckout(selectedPlan === "yearly" ? "price_1U54KhKAZzdmjUI514WTnG9g" : "price_1U54SBKAZzdmjUI5NLeutbw4")}
                            >
                                {loading ?
                                <figure className={styles["loading__payment--wrapper"]}>
                                    <LuLoaderCircle className={styles.loading__payment} />
                                </figure>
                                :
                                selectedPlan === "yearly" ? "Start your free 7-day trial" : "Start your first month"}</button>
                        </span>
                        <div className={styles.sales__disclaimer}>{selectedPlan === "yearly" ? "Cancel your trial at any time before it ends, and you won't be charged." : "30-day money back guarantee, no questions asked"}</div>
                    </div>
                    <div className={styles.faq__wrapper}>
                    {FAQs.map((faq, index) => (
                        <div className={styles.faq__card} key={index}>
                            <div className={styles.faq__header}>
                                <div className={styles.faq__title}>{faq.title}</div>
                                <GoChevronDown className={`${styles["faq__icon"]} ${openIndex === index ? styles["faq__icon--show"] : ''}`} onClick={() => toggleItem(index)} />
                            </div>
                            <div className={`${styles.collapse} ${openIndex === index ? styles["collapse__show"] : ''}`}>
                                <div className={styles.faq__text}>
                                    {faq.content}
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
        </>
    )
};