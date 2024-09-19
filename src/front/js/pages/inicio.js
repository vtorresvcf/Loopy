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
                <div className="col-lg-6 text-center mt-4 mt-lg-0">
                    <img
                        src="https://www.shutterstock.com/image-vector/backend-development-coding-software-engineering-600nw-2378388687.jpg"
                        alt="Desarrollo de Software"
                        className="img-fluid rounded shadow-lg"
                        style={{ border: "2px solid #6793AE" }}
                    />
                </div>
            
            </header>
            {/* Features Section */}
            <div className="row mt-5 text-center text-lg-start">
                <div className="col-md-6 mb-4" style={{ borderRadius: "10px", padding: "40px 30px", border: "2px solid #6793AE", marginBottom: "30px", marginRight: "25px", marginLeft: "-15px" }}>
                    <div className="feature-box">
                        <h3 className="text-secondary">Para Programadores</h3>
                        <ul className="list-unstyled mt-3 text-secondary">
                            <li className="mb-2"><strong>Proyectos a tu medida:</strong> Encuentra proyectos que se alineen con tu experiencia y preferencias.</li>
                            <li className="mb-2"><strong>Flexibilidad total:</strong> Trabaja desde cualquier lugar, a tu ritmo y con las condiciones que elijas.</li>
                            <li className="mb-2"><strong>Pago seguro y garantizado:</strong> Recibe pagos de manera segura por tu trabajo, sin complicaciones.</li>
                        </ul>
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