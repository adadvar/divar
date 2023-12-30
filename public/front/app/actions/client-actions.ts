'use client'

import { getCities } from "./global-actions";

export const isCityLocalStorage = () => {
  return localStorage.getItem("cities");
}

export const saveCities = (params: any) => {
  let citiesData = localStorage.getItem("cities");
  localStorage.setItem("cities", JSON.stringify(citiesData));
}