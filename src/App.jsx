import {useState, useEffect, useRef} from "react";
import DomeGallery from './DomeGallery';

function useCounter(target, {duration = 1400, delay = 700} = {}) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        const t = setTimeout(() => {
            let start = 0;
            const step = target / (duration / 16);
            const id = setInterval(() => {
                start += step;
                if (start >= target) {
                    setCount(target);
                    clearInterval(id);
                } else setCount(Math.floor(start));
            }, 16);
        }, delay);
        return () => clearTimeout(t);
    }, [target, duration, delay]);
    return count;
}

function AnimatedButton({children = "Agendar Agora", href = "https://whats.link/arstyllus"}) {
    const btnRef = useRef(null);
    const borderRef = useRef(null);
    const timerRef = useRef(null);
    const enter = () => {
        if (btnRef.current) btnRef.current.dataset.h = "1";
        const g = borderRef.current;
        if (!g) return;
        g.style.transition = "transform .75s linear";
        let d = 0;
        const loop = () => {
            if (btnRef.current?.dataset.h !== "1") return;
            d = d === 0 ? -25 : 0;
            if (borderRef.current) borderRef.current.style.transform = `translateX(${d}%)`;
            timerRef.current = setTimeout(loop, 750);
        };
        loop();
    };
    const leave = () => {
        if (btnRef.current) btnRef.current.dataset.h = "0";
        clearTimeout(timerRef.current);
        const g = borderRef.current;
        if (!g) return;
        g.style.transition = "transform .25s ease-out";
        g.style.transform = "translateX(-5%)";
    };
    return (
        <a ref={btnRef} href={href} target="_blank" rel="noopener noreferrer"
           onMouseEnter={enter} onMouseLeave={leave} data-h="0"
           style={{
               position: "relative", isolation: "isolate", padding: 3, borderRadius: 10, overflow: "hidden",
               backgroundColor: "transparent", display: "inline-flex", alignItems: "center", textDecoration: "none"
           }}>
            <div ref={borderRef} aria-hidden="true"
                 style={{
                     position: "absolute", top: 0, left: 0, height: "100%", width: "400%",
                     background: "linear-gradient(115deg,#f9a8d4,#ec4899,#be185d,#fda4af,#f472b6) 0 0/25% 100%",
                     transform: "translateX(-5%)", zIndex: 0
                 }}/>
            <span style={{
                position: "relative", display: "block", padding: "0.5rem 1.25rem", fontSize: "0.875rem",
                background: "#1a0a0f", borderRadius: 8, zIndex: 1, color: "white", fontWeight: 500,
                whiteSpace: "nowrap", fontFamily: "'Inter',sans-serif"
            }}>
                {children}
            </span>
        </a>
    );
}

function ServiceCard({pkg, index}) {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className="svc-card-new card-anim"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                position: "relative",
                borderRadius: 24,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                background: "#fff",
                border: pkg.popular
                    ? `1.5px solid ${pkg.accent}`
                    : "1px solid rgba(0,0,0,.07)",
                boxShadow: hovered
                    ? "0 24px 48px rgba(236,72,153,.13)"
                    : "0 4px 16px rgba(0,0,0,.05)",
                transform: hovered ? "translateY(-8px)" : "translateY(0)",
                transition: "transform .4s cubic-bezier(.23,1,.32,1), box-shadow .4s, border-color .3s",
                cursor: "pointer",
                height: "100%",
            }}
        >
            {pkg.popular && (
                <div style={{
                    position: "absolute", top: 0, left: 0, right: 0,
                    height: 3, zIndex: 10,
                    background: `linear-gradient(90deg, ${pkg.accent}, #ec4899, ${pkg.accent})`,
                }}/>
            )}

            <div style={{
                position: "relative",
                height: 260,
                overflow: "hidden",
                flexShrink: 0,
            }}>
                <img
                    src={pkg.img}
                    alt={pkg.title}
                    style={{
                        width: "100%", height: "100%",
                        objectFit: "cover", display: "block",
                        transform: hovered ? "scale(1.05)" : "scale(1)",
                        transition: "transform .6s ease",
                        filter: "saturate(1.05)",
                    }}
                />
                <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0,
                    height: 60,
                    background: "linear-gradient(to bottom, transparent, #fff)",
                }}/>

                <div style={{
                    position: "absolute", top: 14, left: 16,
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    fontSize: "2.6rem",
                    fontWeight: 400,
                    color: "rgba(255,255,255,.9)",
                    lineHeight: 1,
                    textShadow: "0 2px 12px rgba(0,0,0,.35)",
                    letterSpacing: "-0.03em",
                }}>
                    {String(index + 1).padStart(2, "0")}
                </div>

                {pkg.popular && (
                    <div style={{
                        position: "absolute", top: 14, right: 14,
                        background: "#ec4899",
                        color: "#fff",
                        fontSize: ".6rem",
                        fontWeight: 600,
                        letterSpacing: ".1em",
                        textTransform: "uppercase",
                        padding: ".3rem .65rem",
                        borderRadius: 50,
                    }}>
                        ★ Popular
                    </div>
                )}
            </div>

            <div style={{
                flex: 1,
                padding: "1rem 1.5rem 1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: ".75rem",
            }}>
                <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                    <span style={{
                        fontSize: ".65rem",
                        fontWeight: 600,
                        color: "#9ca3af",
                        textTransform: "uppercase",
                        letterSpacing: ".1em",
                    }}>
                        {pkg.tag}
                    </span>
                    <span style={{
                        fontSize: ".65rem",
                        color: "#c9b0ba",
                        fontWeight: 400,
                        letterSpacing: ".05em",
                    }}>
                        {pkg.duration}
                    </span>
                </div>

                <div style={{display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: ".5rem"}}>
                    <h3 style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "clamp(1.6rem, 3.5vw, 2rem)",
                        fontWeight: 400,
                        color: "#1a0a0f",
                        lineHeight: 1,
                        margin: 0,
                    }}>
                        {pkg.title}
                    </h3>
                    <span style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "1.5rem",
                        fontWeight: 400,
                        color: pkg.accent,
                        lineHeight: 1,
                        flexShrink: 0,
                    }}>
                        {pkg.price}
                    </span>
                </div>

                <div style={{height: 1, background: "#f3f4f6"}}/>

                <div style={{display: "flex", flexDirection: "column", gap: 6}}>
                    {pkg.perks.map((p, pi) => (
                        <div key={pi} style={{
                            display: "flex", alignItems: "center", gap: 8,
                        }}>
                            <div style={{
                                width: 4, height: 4, borderRadius: "50%",
                                background: pkg.accent, flexShrink: 0,
                            }}/>
                            <span style={{
                                fontSize: ".78rem", color: "#6b7280",
                                fontWeight: 300, lineHeight: 1.4,
                            }}>
                                {p}
                            </span>
                        </div>
                    ))}
                </div>

                <a
                    href="https://whats.link/arstyllus"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: "auto",
                        paddingTop: ".75rem",
                        borderTop: "1px solid #f9f0f5",
                        textDecoration: "none",
                        color: "#1a0a0f",
                    }}
                >
                    <span style={{fontSize: ".8rem", fontWeight: 500}}>Reservar agora</span>
                    <span style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 32, height: 32,
                        borderRadius: "50%",
                        background: pkg.popular ? pkg.accent : "#f9f0f5",
                        color: pkg.popular ? "#fff" : "#1a0a0f",
                        fontSize: ".85rem",
                        transition: "transform .2s",
                        transform: hovered ? "translateX(3px)" : "none",
                    }}>→</span>
                </a>
            </div>
        </div>
    );
}

function SliderDots({total, active}) {
    return (
        <div style={{display: "flex", justifyContent: "center", gap: 6, marginTop: "1.25rem"}}>
            {Array.from({length: total}).map((_, i) => (
                <div key={i} style={{
                    width: i === active ? 20 : 6,
                    height: 6,
                    borderRadius: 3,
                    background: i === active ? "#ec4899" : "#f9a8d4",
                    transition: "all .35s cubic-bezier(.23,1,.32,1)",
                }}/>
            ))}
        </div>
    );
}

export default function App() {
    const [activeCard, setActiveCard] = useState(0);
    const sliderRef = useRef(null);
    const c1 = useCounter(13);
    const c2 = useCounter(500);
    const c3 = useCounter(2500);

    useEffect(() => {
        const colors = ['#ec4899', '#f9a8d4', '#fda4af', '#e879f9', '#fbcfe8'];
        let last = 0;
        const onMove = (e) => {
            const now = Date.now();
            if (now - last < 40) return;
            last = now;
            const size = 5 + Math.random() * 8;
            const el = document.createElement('div');
            el.style.cssText = `
                position:fixed;pointer-events:none;z-index:9999;border-radius:50%;
                left:${e.clientX}px;top:${e.clientY}px;
                width:${size}px;height:${size}px;
                background:${colors[Math.floor(Math.random() * colors.length)]};
                transform:translate(-50%,-50%);
                transition:transform .7s ease,opacity .7s ease;
                opacity:.75;`;
            document.body.appendChild(el);
            requestAnimationFrame(() => {
                const dx = (Math.random() - 0.5) * 60;
                const dy = (Math.random() - 0.5) * 60 - 20;
                el.style.transform = `translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px)) scale(0)`;
                el.style.opacity = '0';
            });
            setTimeout(() => el.remove(), 750);
        };
        window.addEventListener('mousemove', onMove);
        return () => window.removeEventListener('mousemove', onMove);
    }, []);

    const onSliderScroll = () => {
        const el = sliderRef.current;
        if (!el) return;
        const cardWidth = el.firstChild?.offsetWidth ?? 0;
        const gap = 16;
        const idx = Math.round(el.scrollLeft / (cardWidth + gap));
        setActiveCard(Math.max(0, idx));
    };

    const services = [
        {
            img: "https://images.unsplash.com/photo-1606251706444-d069cd266189?w=900&auto=format&fit=crop&q=60",
            title: "Penteado",
            price: "R$ 150",
            tag: "Festas & Eventos",
            duration: "1–2h",
            accent: "#fda4af",
            perks: ["Escova ou ondas glamour", "Coque ou semi-preso", "Atendimento local"],
        },
        {
            img: "https://images.unsplash.com/photo-1574871786514-46e1680ea587?w=900&auto=format&fit=crop&q=60",
            title: "Noiva Completa",
            price: "R$ 280",
            tag: "Para o Grande Dia",
            duration: "2–3h",
            accent: "#ec4899",
            popular: true,
            perks: ["Penteado exclusivo", "Teste incluso", "Atendimento em domicílio", "Acessórios inclusos"],
        },
        {
            img: "https://images.unsplash.com/photo-1481066717861-4775e000c88a?w=900&auto=format&fit=crop&q=60",
            title: "Dia da Noiva",
            price: "R$ 450",
            tag: "Equipe Completa",
            duration: "4h+",
            accent: "#f9a8d4",
            perks: ["Noiva + madrinhas", "Maquiagem inclusa", "Atendimento em domicílio", "Acessórios inclusos"],
        },
    ];

    const portfolio = [
        { src: "https://images.unsplash.com/photo-1548313093-370cf4ba3892?w=900&auto=format&fit=crop&q=60", alt: "Tranças" },
        { src: "https://images.unsplash.com/photo-1549417229-7686ac5595fd?w=900&auto=format&fit=crop&q=60", alt: "Noiva" },
        { src: "https://images.unsplash.com/photo-1492175742197-ed20dc5a6bed?w=900&auto=format&fit=crop&q=60", alt: "Ondas" },
        { src: "https://images.unsplash.com/photo-1523264114838-feca761983c4?w=900&auto=format&fit=crop&q=60", alt: "Coque" },
        { src: "https://images.unsplash.com/photo-1643216583837-f6d664d48eac?w=900&auto=format&fit=crop&q=60", alt: "Bridal" },
        { src: "https://images.unsplash.com/photo-1593575620619-602b4ddf6e96?w=900&auto=format&fit=crop&q=60", alt: "Solto" },
    ];

    const css = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital@1&family=Inter:wght@300;400;500;600&display=swap');
    *{box-sizing:border-box;margin:0;padding:0}
    html,body{font-family:'Inter',sans-serif;background:transparent;color:#1a0a0f;scroll-behavior:smooth}
    a{cursor:pointer}

    .cormorant{font-family:'Inter',sans-serif;font-weight:300!important;letter-spacing:-0.04em!important;font-style:normal!important}
    .italic-chic{font-family:'Cormorant Garamond',serif!important;font-style:italic!important;font-weight:400!important;letter-spacing:0!important}

    .grad-bg{position:fixed;top:0;left:0;width:100%;height:100vh;z-index:-1;
      background:linear-gradient(135deg,#fce7f3 0%,#fbcfe8 40%,#f9a8d4 75%,#f472b6 100%);
      animation:gshift 20s ease-in-out infinite alternate}
    .grad-bg::before{content:'';position:absolute;inset:0;
      background:radial-gradient(circle at 15% 50%,rgba(255,255,255,0.4) 0%,transparent 50%),
                 radial-gradient(circle at 85% 30%,rgba(255,200,220,0.5) 0%,transparent 50%)}
    .grad-bg::after{content:'';position:absolute;inset:0;
      background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
      pointer-events:none}
    @keyframes gshift{0%{filter:hue-rotate(0deg) brightness(1.1)}100%{filter:hue-rotate(15deg) brightness(1)}}

    .glass-nav{backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);background:rgba(255,255,255,.65);border:1px solid rgba(255,255,255,.4)}
    .nav-link{font-size:.875rem;font-weight:500;color:#1a0a0f;text-decoration:none;transition:color .2s;letter-spacing:.01em}
    .nav-link:hover{color:#ec4899}

    .line-reveal{overflow:hidden;display:block}
    .line-inner{display:block;transform:translateY(108%);animation:lineup .9s cubic-bezier(0.16,1,0.3,1) forwards}
    .lr-1{animation-delay:.05s}.lr-2{animation-delay:.2s}.lr-3{animation-delay:.38s}
    @keyframes lineup{to{transform:translateY(0)}}

    .fade-in{opacity:0;animation:fi .7s ease forwards}
    .fi-1{animation-delay:.3s}.fi-2{animation-delay:.5s}.fi-3{animation-delay:.7s}.fi-4{animation-delay:.9s}
    @keyframes fi{to{opacity:1}}

    .spin-label{animation:spin 12s linear infinite}
    @keyframes spin{to{transform:rotate(360deg)}}

    .marquee-outer{overflow:hidden;border-top:1px solid rgba(0,0,0,.06)}
    .marquee-track{display:flex;animation:mq 28s linear infinite;width:max-content}
    .marquee-track:hover{animation-play-state:paused}
    @keyframes mq{to{transform:translateX(-50%)}}
    .mq-item{display:flex;align-items:center;gap:1rem;padding:.7rem 2.5rem;font-size:.72rem;font-weight:400;
      color:#aaa;letter-spacing:.1em;text-transform:uppercase;white-space:nowrap;border-right:1px solid rgba(0,0,0,.05)}

    .card-anim{opacity:0;transform:translateY(24px);filter:blur(4px);animation:fadein .75s ease-out forwards}
    .card-anim:nth-child(1){animation-delay:.2s}
    .card-anim:nth-child(2){animation-delay:.35s}
    .card-anim:nth-child(3){animation-delay:.5s}
    @keyframes fadein{to{opacity:1;transform:translateY(0);filter:blur(0)}}

    .svc-grid{
      display:grid;
      grid-template-columns:repeat(3,1fr);
      gap:1.25rem;
      align-items:stretch;
    }
    .svc-grid > *{ height: 500px; }

    .about-grid-new{display:grid;grid-template-columns:1.8fr 1fr;gap:2rem}
    .slider-dots-mobile{display:none}

    @media(max-width:900px){
      .hero-ed-bottom{grid-template-columns:1fr!important}
      .hero-ed-col-r,.hero-ed-col-img{display:none!important}
      .hero-title{font-size:clamp(3.5rem,15vw,5.5rem)!important}
      .about-grid-new{grid-template-columns:1fr!important}
      .hide-mobile{display:none!important}
      .hero-ed-col-l{
        border-right:none!important;
        padding:2rem 1.5rem 2.5rem!important;
        gap:2rem!important;
        min-height:auto!important;
      }
      .hero-ed-col-l > p{
        font-size:.9rem!important;
        line-height:1.75!important;
        margin-bottom:.5rem!important;
      }
      .svc-grid{
        display:flex!important;
        overflow-x:auto!important;
        scroll-snap-type:x mandatory!important;
        -webkit-overflow-scrolling:touch!important;
        scrollbar-width:none!important;
        gap:1rem!important;
        margin:0 -1.5rem!important;
        padding:0 1.5rem 1.25rem!important;
      }
      .svc-grid::-webkit-scrollbar{display:none!important}
      .svc-grid > *{
        flex:0 0 84%!important;
        scroll-snap-align:start!important;
        height:auto!important;
        min-height:520px!important;
      }
      .slider-dots-mobile{display:flex}
      .mobile-section-pad{
        padding:2rem 1.5rem!important;
      }
    }
    `;

    return (
        <>
            <style>{css}</style>
            <div className="grad-bg"/>

            <header style={{position: "sticky", top: 0, zIndex: 40}}>
                <div style={{maxWidth: 1280, margin: "0 auto", padding: ".5rem 1rem"}}>
                    <div className="glass-nav" style={{
                        borderRadius: 24, padding: ".75rem 1.75rem", display: "flex", alignItems: "center", justifyContent: "space-between"
                    }}>
                        <div style={{display: "flex", alignItems: "center", gap: 10}}>
                            <svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" fill="#ec4899"/></svg>
                            <span className="cormorant" style={{fontSize: "1.25rem", fontWeight: 400, letterSpacing: ".02em"}}>Arielli Styllus</span>
                        </div>
                        <nav style={{display: "flex", gap: "2rem", alignItems: "center"}}>
                            <a className="nav-link hide-mobile" href="#sobre">Sobre</a>
                            <a className="nav-link hide-mobile" href="#servicos">Serviços</a>
                            <a className="nav-link hide-mobile" href="#portfolio">Portfólio</a>
                            <AnimatedButton>Agendar</AnimatedButton>
                        </nav>
                    </div>
                </div>
            </header>

            <main style={{maxWidth: 1280, margin: "0 auto", padding: "0 1rem"}}>
                <section style={{
                    background: "rgba(255,255,255,0.87)", borderRadius: 32, marginTop: "1rem", boxShadow: "0 8px 40px rgba(236,72,153,.06)", overflow: "hidden", position: "relative"
                }}>
                    <div style={{
                        display: "flex", justifyContent: "space-between", alignItems: "center", padding: ".75rem 2.5rem", borderBottom: "1px solid rgba(0,0,0,.06)"
                    }}>
                        <span className="fade-in fi-1" style={{fontSize: ".68rem", color: "#aaa", letterSpacing: ".12em", textTransform: "uppercase", fontWeight: 500}}>
                            — Cabeleireira especialista
                        </span>
                        <span className="fade-in fi-1" style={{fontSize: ".68rem", color: "#aaa", letterSpacing: ".1em", textTransform: "uppercase", fontWeight: 500}}>
                            Parapuã · SP · Brasil · Est. 2012
                        </span>
                    </div>
                    <div style={{padding: "0 2rem", borderBottom: "1px solid rgba(0,0,0,.06)"}}>
                        <h1 className="hero-title" style={{fontSize: "clamp(5rem,13vw,11rem)", lineHeight: .84, letterSpacing: "-0.05em", fontWeight: 300}}>
                            <span className="line-reveal" style={{display: "block"}}><span className="line-inner lr-1" style={{display: "block", fontFamily: "'Inter',sans-serif"}}>ARIELLI</span></span>
                            <span className="line-reveal" style={{display: "block"}}><span className="line-inner lr-2 italic-chic" style={{display: "block", color: "#b8a0a8", paddingLeft: ".08em"}}>Styllus.</span></span>
                        </h1>
                    </div>
                    <div className="hero-ed-bottom" style={{display: "grid", gridTemplateColumns: "1fr 1.5fr 1fr", minHeight: 460}}>
                        <div className="hero-ed-col-l fade-in fi-2" style={{
                            padding: "2rem 2.5rem", borderRight: "1px solid rgba(0,0,0,.06)", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "2rem",
                        }}>
                            <p style={{fontSize: ".95rem", color: "#6b7280", lineHeight: 1.85, maxWidth: 260}}>
                                Especialista em penteados para noivas e eventos. Cada fio conta uma história.
                            </p>
                            <div style={{display: "flex", flexDirection: "column", gap: "1.5rem"}}>
                                {[{n: `${c1}+`, l: "Anos de experiência"}, {n: `${c2}+`, l: "Noivas atendidas"}, {n: `${(c3 / 1000).toFixed(1)}K`, l: "Seguidores no Instagram"}].map(({n, l}, i) => (
                                    <div key={i} style={{display: "flex", alignItems: "baseline", gap: "1rem", borderTop: "1px solid #f3f4f6", paddingTop: "1rem"}}>
                                        <span style={{fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 1, minWidth: "3.5rem"}}>{n}</span>
                                        <span style={{fontSize: ".72rem", color: "#9ca3af", letterSpacing: ".06em", textTransform: "uppercase", lineHeight: 1.4}}>{l}</span>
                                    </div>
                                ))}
                            </div>
                            <div style={{display: "flex", flexDirection: "column", gap: "1rem"}}>
                                <AnimatedButton>Agendar Agora</AnimatedButton>
                                <a href="https://www.instagram.com/arielli_styllus" target="_blank" rel="noopener noreferrer" style={{fontSize: ".8rem", color: "#9ca3af", textDecoration: "none", letterSpacing: ".04em", display: "flex", alignItems: "center", gap: 6}}>@arielli_styllus ↗</a>
                            </div>
                        </div>
                        <div className="hero-ed-col-img" style={{overflow: "hidden", position: "relative", borderRight: "1px solid rgba(0,0,0,.06)"}}>
                            <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&q=85" alt="Arielli Styllus" style={{width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "saturate(1.05) contrast(1.02)", transition: "transform .8s ease"}} onMouseEnter={e => e.target.style.transform = "scale(1.03)"} onMouseLeave={e => e.target.style.transform = "scale(1)"}/>
                            <div style={{position: "absolute", bottom: 20, left: 20, background: "rgba(255,255,255,0.88)", backdropFilter: "blur(8px)", borderRadius: 8, padding: ".4rem .75rem", fontSize: ".68rem", color: "#6b7280", letterSpacing: ".1em", textTransform: "uppercase", fontWeight: 500}}>✦ Noivas & Eventos</div>
                        </div>
                        <div className="hero-ed-col-r fade-in fi-3" style={{padding: "2rem 2.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "1.5rem"}}>
                            <div style={{display: "flex", justifyContent: "flex-end"}}>
                                <div style={{position: "relative", width: 90, height: 90}}>
                                    <svg viewBox="0 0 100 100" width="90" height="90" className="spin-label"><path id="circ" d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none"/><text fontSize="10.5" fill="#9ca3af" letterSpacing="3.2" fontFamily="Inter,sans-serif"><textPath href="#circ">AGENDAR · AGORA · ARIELLI ·</textPath></text></svg>
                                    <div style={{position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem", color: "#ec4899"}}>✦</div>
                                </div>
                            </div>
                            <div style={{flex: 1, borderRadius: 20, overflow: "hidden", minHeight: 200}}>
                                <img src="https://images.unsplash.com/photo-1560869713-7d0a29430803?w=600&q=80" alt="Penteado" style={{width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "saturate(1.05)", transition: "transform .8s ease"}} onMouseEnter={e => e.target.style.transform = "scale(1.04)"} onMouseLeave={e => e.target.style.transform = "scale(1)"}/>
                            </div>
                            <div style={{borderTop: "1px solid #f0f0f0", paddingTop: "1rem"}}>
                                <p style={{fontSize: ".72rem", color: "#aaa", letterSpacing: ".06em", lineHeight: 1.6, textTransform: "uppercase"}}>Atendimento em domicílio<br/>Parapuã e região · SP</p>
                            </div>
                        </div>
                    </div>
                    <div className="marquee-outer">
                        <div className="marquee-track">
                            {[...Array(2)].flatMap((_, ri) => ["Noivas", "Penteados", "Festas", "Alisamentos", "Madrinhas", "Eventos", "Domicílio", "Premium", "Casamentos"].map((item, i) => (<div key={`${ri}-${i}`} className="mq-item">{item}</div>)))}
                        </div>
                    </div>
                </section>

                <section id="sobre" className="mobile-section-pad" style={{background: "rgba(255,255,255,0.82)", borderRadius: 32, padding: "3rem", marginTop: "1.5rem", boxShadow: "0 10px 40px rgba(0,0,0,0.03)"}}>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem"}}>
                        <p style={{fontSize: ".75rem", fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: ".1em"}}>/ Sobre a Profissional</p>
                        <span style={{fontSize: ".75rem", fontWeight: 600, color: "#9ca3af"}}>(01)</span>
                    </div>
                    <h2 className="cormorant" style={{fontSize: "clamp(2.5rem,6vw,4.5rem)", color: "#111", marginBottom: "2.5rem"}}>
                        Por trás dos <span className="italic-chic" style={{color: "#f472b6"}}>pincéis.</span>
                    </h2>
                    <div className="about-grid-new">
                        <div>
                            <div style={{borderRadius: "24px", overflow: "hidden", border: "1px solid #f3f4f6", marginBottom: "1.5rem"}}>
                                <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80" alt="Arielli Trabalhando" style={{width: "100%", height: "400px", objectFit: "cover", display: "block"}}/>
                            </div>
                            <div style={{padding: "0 1rem"}}>
                                <p style={{fontSize: "1.1rem", color: "#374151", lineHeight: 1.8, marginBottom: "1rem"}}>Criando belezas autênticas e intencionais que contam a sua história no dia mais importante da sua vida.</p>
                                <p style={{fontSize: ".95rem", color: "#6b7280", lineHeight: 1.7, marginBottom: "1rem"}}>Com 13 anos dedicados à arte de transformar cabelos, minha abordagem mistura o clássico com a leveza da emoção. Cada penteado é composto com intenção, focando em realçar a beleza genuína de cada cliente que senta na minha cadeira.</p>
                                <p style={{fontSize: ".95rem", color: "#6b7280", lineHeight: 1.7}}>Trabalho com noivas e eventos, garantindo que o seu visual não apenas pareça perfeito nas fotos, mas se mantenha impecável e confortável durante toda a festa.</p>
                            </div>
                        </div>
                        <div style={{display: "flex", flexDirection: "column", gap: "1.5rem"}}>
                            <div style={{background: "#f9fafb", borderRadius: "24px", padding: "1.5rem", border: "1px solid #f3f4f6"}}>
                                <div style={{display: "flex", alignItems: "center", gap: 8, marginBottom: "1.5rem"}}>
                                    <span style={{fontSize: "1rem"}}>✦</span><span style={{fontSize: ".7rem", fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: ".1em"}}>Em Números</span>
                                </div>
                                <div style={{display: "flex", flexDirection: "column", gap: "1.25rem"}}>
                                    {[{n: "13+", l: "Anos de Experiência"}, {n: "500+", l: "Noivas Atendidas"}, {n: "2.5K", l: "Seguidores no Instagram"}].map(({n, l}) => (<div key={l}><p className="cormorant" style={{fontSize: "2.5rem", color: "#111", lineHeight: 1}}>{n}</p><p style={{fontSize: ".8rem", color: "#6b7280", marginTop: "0.2rem"}}>{l}</p></div>))}
                                </div>
                            </div>
                            <div style={{background: "#111", color: "#fff", borderRadius: "24px", padding: "1.5rem", boxShadow: "0 10px 25px rgba(0,0,0,0.1)"}}>
                                <div style={{display: "flex", alignItems: "center", gap: 8, marginBottom: "1.5rem"}}>
                                    <span style={{fontSize: "1rem", color: "#f9a8d4"}}>✂</span><span style={{fontSize: ".7rem", fontWeight: 600, color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: ".1em"}}>Especialidades</span>
                                </div>
                                <div style={{display: "flex", flexDirection: "column", gap: "1rem"}}>
                                    {[["Penteados para Noivas", "Premium"], ["Penteados para Festas", "Eventos"], ["Alisamento / Progressiva", "Tratamento"], ["Escova e Finalização", "Dia a dia"]].map(([a, b], i, arr) => (<div key={a} style={{display: "flex", justifyContent: "space-between", borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.1)" : undefined, paddingBottom: i < arr.length - 1 ? ".5rem" : undefined}}><span style={{fontSize: ".85rem", color: "rgba(255,255,255,0.9)"}}>{a}</span><span style={{fontSize: ".7rem", color: "rgba(255,255,255,0.5)"}}>{b}</span></div>))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="servicos" className="mobile-section-pad" style={{background: "rgba(255,255,255,0.82)", borderRadius: 32, padding: "3rem", marginTop: "1.5rem", boxShadow: "0 10px 40px rgba(0,0,0,0.03)"}}>
                    <div style={{display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem"}}>
                        <div>
                            <p style={{fontSize: ".75rem", fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: ".5rem"}}>/ Serviços</p>
                            <h2 className="cormorant" style={{fontSize: "clamp(2.5rem,6vw,4.5rem)", color: "#111", lineHeight: 1.05}}>Pacotes para<br/><span className="italic-chic" style={{color: "#f472b6"}}>cada momento.</span></h2>
                        </div>
                        <a href="https://whats.link/arstyllus" target="_blank" rel="noopener noreferrer" style={{display: "inline-flex", alignItems: "center", gap: 6, padding: ".625rem 1.25rem", borderRadius: 50, background: "rgba(255,255,255,0.82)", border: "1px solid #e5e7eb", color: "#111", textDecoration: "none", fontSize: ".8125rem", fontWeight: 500, whiteSpace: "nowrap"}}>Orçamento personalizado ↗</a>
                    </div>
                    <div className="svc-grid" ref={sliderRef} onScroll={onSliderScroll}>
                        {services.map((pkg, i) => (<ServiceCard key={i} pkg={pkg} index={i}/>))}
                    </div>
                    <div className="slider-dots-mobile" style={{justifyContent: "center", gap: 6, marginTop: "1.25rem"}}>
                        <SliderDots total={services.length} active={activeCard}/>
                    </div>
                </section>

                <section id="portfolio" className="mobile-section-pad" style={{
                    background: "#0a0406", borderRadius: 32, padding: "3rem 0", marginTop: "1.5rem", boxShadow: "0 10px 40px rgba(0,0,0,0.03)", overflow: "hidden"
                }}>
                    <div style={{display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem", padding: "0 3rem"}}>
                        <div>
                            <p style={{fontSize: ".75rem", fontWeight: 600, color: "#f9a8d4", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: ".5rem"}}>/ Portfólio</p>
                            <h2 className="cormorant" style={{fontSize: "clamp(2.5rem,6vw,4.5rem)", color: "#fff", lineHeight: 1.05}}>Últimos<br/><span className="italic-chic" style={{color: "#f9a8d4"}}>trabalhos.</span></h2>
                        </div>
                        <a href="https://www.instagram.com/arielli_styllus" target="_blank" rel="noopener noreferrer" style={{display: "inline-flex", alignItems: "center", gap: 6, padding: ".625rem 1.25rem", borderRadius: 50, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", textDecoration: "none", fontSize: ".8125rem", fontWeight: 500}}>Ver Instagram ＋</a>
                    </div>
                    <div style={{width: '100%', height: '70vh', minHeight: '600px', position: 'relative'}}>
                        <DomeGallery images={portfolio} fit={0.9} minRadius={850} maxVerticalRotationDeg={0} segments={32} dragDampening={2.6} grayscale={false}/>
                    </div>
                </section>

                <section style={{background: "rgba(255,255,255,0.82)", borderRadius: 32, padding: "6rem 2rem", marginTop: "1.5rem", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", minHeight: "600px", boxShadow: "0 10px 40px rgba(0,0,0,0.03)"}}>
                    {[
                        {src: "https://images.unsplash.com/photo-1593575620619-602b4ddf6e96?w=900&auto=format&fit=crop&q=60", s: {top: -20, left: -40, transform: "rotate(-7deg)", width: 280}},
                        {src: "https://images.unsplash.com/photo-1608245536505-9bab008d00d3?w=900&auto=format&fit=crop&q=60", s: {top: -10, right: -30, transform: "rotate(6deg)", width: 250}},
                        {src: "https://images.unsplash.com/photo-1743017521050-d2655a8d4410?w=900&auto=format&fit=crop&q=60", s: {bottom: -30, left: 10, transform: "rotate(-12deg)", width: 290}},
                        {src: "https://images.unsplash.com/photo-1583322695560-25fc86f56017?w=900&auto=format&fit=crop&q=60", s: {bottom: 40, right: -10, transform: "rotate(8deg)", width: 260}},
                    ].map((d, i) => (<div key={i} style={{position: "absolute", borderRadius: 24, overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,.15)", zIndex: 0, ...d.s}}><img src={d.src} alt="" style={{width: "100%", height: "100%", objectFit: "cover", display: "block"}}/></div>))}
                    <div style={{position: "relative", textAlign: "center", maxWidth: 720, margin: "0 auto", padding: "2rem 1rem", zIndex: 10, background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)", borderRadius: "32px", border: "1px solid rgba(255,255,255,0.5)"}}>
                        <div style={{display: "flex", justifyContent: "space-between", marginBottom: "2rem"}}>
                            <span style={{fontSize: ".75rem", color: "#9ca3af", textTransform: "uppercase", letterSpacing: ".1em", fontWeight: 600}}>/ Depoimentos</span><span style={{fontSize: ".75rem", color: "#9ca3af", fontWeight: 600}}>(100+)</span>
                        </div>
                        <h2 className="cormorant" style={{fontSize: "clamp(2.5rem,6vw,4rem)", color: "#111", lineHeight: 1.1}}>
                            "Fiquei apaixonada no resultado! A Arielli transformou meu dia da noiva em algo absolutamente <span className="italic-chic" style={{color: "#f472b6"}}>mágico.</span>"
                        </h2>
                        <p style={{color: "#6b7280", marginTop: "1.5rem", fontSize: ".9rem", letterSpacing: ".02em"}}>— Fernanda S., Noiva 2024</p>
                        <a href="https://www.instagram.com/arielli_styllus" target="_blank" rel="noopener noreferrer" style={{display: "inline-flex", alignItems: "center", gap: 6, marginTop: "2.5rem", padding: ".85rem 2rem", borderRadius: 50, background: "#111", color: "#fff", textDecoration: "none", fontSize: ".875rem", fontWeight: 500}}>Ver mais depoimentos ↗</a>
                    </div>
                </section>

                <footer style={{background: "#0a0406", borderRadius: 40, marginTop: "2rem", marginBottom: "1rem", overflow: "hidden", display: "flex", flexDirection: "column", color: "#fff"}}>
                    <div style={{padding: "5rem clamp(1.5rem,5vw,4rem) 0"}}>
                        <div style={{display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "2rem", paddingBottom: "4rem", borderBottom: "1px solid rgba(255,255,255,0.08)"}}>
                            <h2 className="cormorant" style={{fontSize: "clamp(3rem,7vw,5.5rem)", color: "#fff", lineHeight: .95, margin: 0}}>Pronta para<br/><span className="italic-chic" style={{color: "#f9a8d4"}}>começar?</span></h2>
                            <a href="https://whats.link/arstyllus" target="_blank" rel="noopener noreferrer" style={{background: "#f9a8d4", color: "#111", padding: "1.25rem 2.5rem", borderRadius: "50px", textDecoration: "none", fontWeight: 500, fontSize: "1rem", display: "flex", alignItems: "center", gap: "10px"}}>Agendar via WhatsApp ↗</a>
                        </div>
                        <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "3rem", paddingTop: "4rem", paddingBottom: "4rem"}}>
                            <div>
                                <p style={{fontSize: ".7rem", color: "rgba(255,255,255,.3)", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: "1.5rem"}}>/ Estúdio</p>
                                <p style={{fontSize: ".9rem", color: "rgba(255,255,255,.9)", marginBottom: ".5rem"}}>📍 Parapuã, SP</p>
                                <p style={{fontSize: ".9rem", color: "rgba(255,255,255,.5)", lineHeight: 1.6}}>Especialista em Penteados.<br/>13 anos transformando vidas.</p>
                            </div>
                            <div>
                                <p style={{fontSize: ".7rem", color: "rgba(255,255,255,.3)", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: "1.5rem"}}>/ Social</p>
                                <div style={{display: "flex", flexDirection: "column", gap: "1rem"}}>
                                    <a href="https://www.instagram.com/arielli_styllus" target="_blank" rel="noopener noreferrer" style={{color: "#fff", textDecoration: "none", fontSize: ".9rem"}}>Instagram ↗</a>
                                    <a href="https://whats.link/arstyllus" target="_blank" rel="noopener noreferrer" style={{color: "#fff", textDecoration: "none", fontSize: ".9rem"}}>WhatsApp ↗</a>
                                </div>
                            </div>
                            <div>
                                <p style={{fontSize: ".7rem", color: "rgba(255,255,255,.3)", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: "1.5rem"}}>/ Navegação</p>
                                <div style={{display: "flex", flexDirection: "column", gap: "1rem"}}>
                                    {["Sobre", "Serviços", "Portfólio"].map((item, i) => (<a key={i} href={`#${item.toLowerCase()}`} style={{color: "#fff", textDecoration: "none", fontSize: ".9rem"}}>{item}</a>))}
                                </div>
                            </div>
                        </div>
                        <div style={{display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", paddingTop: "2rem", paddingBottom: "2rem", borderTop: "1px solid rgba(255,255,255,.05)"}}>
                            <p style={{fontSize: ".75rem", color: "rgba(255,255,255,.4)"}}>© 2025 Arielli Styllus. Todos os direitos reservados.</p>
                            <div style={{display: "flex", gap: "1.5rem"}}>
                                <a href="#" style={{fontSize: ".75rem", color: "rgba(255,255,255,.4)", textDecoration: "none"}}>Privacidade</a>
                                <a href="#" style={{fontSize: ".75rem", color: "rgba(255,255,255,.4)", textDecoration: "none"}}>Termos</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </main>
        </>
    );
}