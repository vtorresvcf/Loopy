import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/Inicio.css";


export const Inicio = () => {
    const { store } = useContext(Context);

    return (
        <div className="inicio-container">
            <header className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">Conecta con el mejor talento freelance</h1>
                    <p className="hero-subtitle">Encuentra oportunidades o contrata a los mejores programadores</p>
                    <div className="cta-buttons">
                        <Link to={"/register"}>
                            <button className="btn-primary">Soy Programador</button>
                        </Link>
                        <Link to={"/contratar"}>
                            <button className="btn-secondary">Contratar Freelancers</button>
                        </Link>
                    </div>
                </div>
            </header>

            <section className="features-section">
                <h2 className="section-title">¿Cómo te ayudamos?</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <h3>💻 Proyectos a Medida</h3>
                        <p>Encuentra proyectos alineados con tu experiencia y preferencias. Trabaja desde donde quieras.</p>
                    </div>
                    <div className="feature-card">
                        <h3>💼 Empresas</h3>
                        <p>Accede a miles de programadores especializados. Simplifica el proceso de contratación y contrata con confianza.</p>
                    </div>
                    <div className="feature-card">
                        <h3>🔒 Pago Seguro</h3>
                        <p>Recibe pagos de manera segura sin complicaciones. Garantizamos tu satisfacción con transacciones seguras.</p>
                    </div>
                    <div className="feature-card">
                        <h3>🌍 Flexibilidad</h3>
                        <p>Trabaja desde cualquier lugar, a tu propio ritmo, y con las condiciones que mejor te acomoden.</p>
                    </div>
                </div>
            </section>

            <section className="testimonials-section">
                <h2 className="section-title">Lo que dicen nuestros usuarios</h2>
                <div className="testimonials-grid">
                    <div className="testimonial">
                        <p>"Loopy ha sido la mejor opción para encontrar proyectos que se adaptan a mi perfil. ¡Totalmente recomendado!"</p>
                        <span>- Ana, Desarrolladora Full-Stack</span>
                    </div>
                    <div className="testimonial">
                        <p>"Contratar programadores nunca fue tan fácil. Loopy simplifica todo el proceso de manera eficiente."</p>
                        <span>- Juan, Empresa de Tecnología</span>
                    </div>
                </div>
            </section>
        </div>
    );
};