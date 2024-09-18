import React, { useContext, useEffect, useState } from 'react'; // Importar useState
import { Context } from "../store/appContext";
import { CardOffer } from "./CardOffer.jsx";
import "../../styles/favoritos.css";

export const Favoritos = () => {
    const { store, actions } = useContext(Context);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterTerm, setFilterTerm] = useState("");
    const [filters, setFilters] = useState({

        searchText: "",

    });

    useEffect(() => {
        actions.getFavorites();
    }, []);



    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchClick = () => {
        setFilterTerm(searchTerm);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearchClick();
        }
    };

    const handleFiltersChange = (updatedFilters) => {
        setFilters(updatedFilters);
    };

    return (
        <div className="favorites-body wrapper">
            <div className="favorites-container">
                <h1 className="favorites-title text-center my-4">Tus Favoritos</h1>
                {!store.favorites || store.favorites.length === 0 && (


                    <div className="favorites-no-favorites text-center">No tienes ofertas guardadas como favoritas.</div>)}

                <div className="search-bar d-flex mx-auto">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar favoritos..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        onKeyDown={handleKeyDown}
                    />
                    <button className="btn btn-search ms-3" onClick={handleSearchClick}>
                        Buscar
                    </button>
                </div>
                <div className="favorites-row">
                    {store.favorites
                        .filter(favoriteOffer =>
                            favoriteOffer.name.toLowerCase().includes(filterTerm.toLowerCase())
                        )
                        .map((favoriteOffer) => (
                            <div className="favorites-card-offer mx-auto" key={favoriteOffer.id}>
                                <CardOffer id={favoriteOffer.id} />
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};
