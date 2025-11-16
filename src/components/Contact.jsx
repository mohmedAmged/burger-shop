import { openingHours, socials, storeInfo } from '../../constants/index.js'
import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/all';
import gsap from 'gsap';

const Contact = () => {
    useGSAP(() => {
        const titleSplit = SplitText.create('#contact h2', { type: 'words' });

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#contact',
                start: 'top center',
            },
            ease: "power1.inOut"
        })

        timeline
            .from(titleSplit.words, {
                opacity: 0, yPercent: 100, stagger: 0.02
            })
            .from('#contact h3, #contact p', {
                opacity: 0, yPercent: 100, stagger: 0.02
            })
            .to('#f-right-leaf', {
                y: '-50', duration: 1, ease: 'power1.inOut'
            }).to('#f-left-leaf', {
                y: '-50', duration: 1, ease: 'power1.inOut'
            }, '<')
    })

    return (
        <footer id="contact">
            <div className="contact-video-wrapper">
                <video
                    className="contact-video"
                    src="/videos/contact2.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                />
            </div>
            <div className="content">
                <h2>{storeInfo.heading}</h2>

                <div>
                    <h3>Visit Our Resturanrt</h3>
                    <p>{storeInfo?.address}</p>
                </div>

                <div>
                    <h3>Contact Us</h3>
                    <p>{storeInfo.contact.phone}</p>
                    <p>{storeInfo.contact.email}</p>
                </div>

                <div>
                    <h3>Open Every Day</h3>
                    {openingHours.map((time) => (
                        <p key={time.day}>
                            {time.day} : {time.time}
                        </p>
                    ))}
                </div>

                <div>
                    <h3>Socials</h3>

                    <div className="flex-center gap-5">
                        {socials.map((social) => (
                            <a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.name}
                            >
                                <img src={social.icon} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                © {new Date().getFullYear()} <a href='https://my-portfolio-psi-orcin-49.vercel.app/' target='_blank' className=' cursor-pointer'>Mohamed Amged</a> — All Rights Reserved
            </div>
        </footer>
    )
}

export default Contact
