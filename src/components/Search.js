import React from "react";

function Search() {
    return (
        <div>
            <form>
                <label>Name
                    <input name="name"/>
                </label>
                <label>
                    <select name="city">
                        <option value="true">City</option>
                        <option value="false">Name</option>
                    </select>
                </label>
                <button type="submit">Search</button>
            </form>
        </div>
    )
}

export default Search