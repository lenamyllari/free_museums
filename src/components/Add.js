import React from "react";

const Add=()=> {
    return (
        <div>

            <form>
                <label>Name
                    <input name="name"/>
                </label>
                <label>City
                    <input name="city"/>
                </label>
                <label>Address
                    <input name="address"/>
                </label>
                <label>Website
                    <input name="website"/>
                </label>
                <label>Theme
                    <input name="theme"/>
                </label>
                <label>Opening hours</label>
                <label>Services</label>
                <button type="submit">Save</button>
            </form>
        </div>
    )
};

export default Add;
