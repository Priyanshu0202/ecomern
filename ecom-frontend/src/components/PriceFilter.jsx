import React from "react";
const PriceFilter = ({ price, setPrice, type, step, min, max }) => {
  const Pricechange = (e) => {
    setPrice((prev) => ({
      ...prev,
      price: {
        max: type === "max" ? e.target.value : prev.price.max,
        min: type === "min" ? e.target.value : prev.price.min,
      },
    }));
  };
  return (
    <div className="w-full">
      <div className="">
        {type === "max" ? "Max Price" : "Min Price"} :
        {type === "max" ? price.price.max : price.price.min}
      </div>
      <input
        type="range"
        max={max}
        min={min}
        step={step}
        onChange={Pricechange}
        value={type === "max" ? price.price.max : price.price.min}
        defaultValue={type === "max" ? max : min}
        className="w-[70%]"
      />
    </div>
  );
};

export default PriceFilter;
