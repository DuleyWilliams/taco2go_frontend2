import { useState, useEffect } from "react";
import { getProteinById, getAllProteins } from "./ProteinManager";

export const ProteinList =  () => {
    const [proteins, setProteins] = useState([]);

    const getProteins = () => {
        return getAllProteins().then((proteinsFromAPI) => {
          setProteins(proteinsFromAPI);
          // We'll do something more interesting with this data soon.
        });
      };

      useEffect(() => {
        getProteins();
      }, []);
}

return (
    <>
        <div className="container-cards">
        {proteins.map((protein) => (
          <ProteinCard 
            key={protein.id}
            protein={protein}
          />
        ))}
      </div>
    </>
)