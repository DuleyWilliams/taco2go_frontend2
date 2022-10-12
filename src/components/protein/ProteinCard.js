import React, { useEffect, useState } from "react";
import { getProteinById, getAllProteins } from "./ProteinManager";

export const ProteinCard = ({ protein, type }) => {
    const [ proteins, setProteins] = 
    useState([]);

    useEffect(() => {
    getProteinById(protein.id);
      }, []);
}