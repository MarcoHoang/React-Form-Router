import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Category() {
    const navigate = useNavigate();

    // Điều hướng sang /product và truyền categoryId qua state
    const sendDataToProduct = (event) => {
        navigate("/product", { state: { categoryId: event.target.value } });
    };

    return (
        <div className="app-container">
            <h2>Select a Category:</h2>
            <select defaultValue="default" onChange={sendDataToProduct}>
                <option value="default" disabled hidden>
                    Choose your car
                </option>
                <option value="1">Honda</option>
                <option value="2">Suzuki</option>
                <option value="3">Yamaha</option>
            </select>
        </div>
    );
}

export default Category;