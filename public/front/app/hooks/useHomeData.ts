'use client'
import { data } from "@/public/interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../GlobalRedux/store";
import { useEffect, useState } from "react";

export const useHomeData = () => {
  const [data, setData] = useState<data>()
  useEffect(() => {
    const data: data = useSelector((state: RootState) => state.global.data);
    setData(data)
  }, [])
  return data;
}
