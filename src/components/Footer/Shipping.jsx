import React, { useEffect } from "react";

import "./FooterLinks.scss";

function Shipping() {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="main-layout">
      <div className="data">
        <h2>What's Your Shipping Policy?</h2>
        <br />
        <div>
          We accept orders online 24 hours a day, seven days a week. Orders entered on TheShoebox.ca will then be processed (pending credit card approval) and shipped out from our Brampton distribution center. Orders are limited to a single shipping address per order and will be shipped via standard or express.
          <br /> <br />
          Orders placed Monday-Friday before 12 PM EST will begin processing that day, excluding holidays. Orders placed after 12 PM EST will begin processing the next business day. Orders placed on Friday after 12 PM EST will begin processing on the following Monday. If the merchandise selected is not currently available or if additional identification is needed for credit verification, The Shoebox Customer Service will contact you.
          <br /> <br />
          We currently do not process orders on the weekend or holidays.
        </div>
        <h4>REFUSED SHIPMENTS </h4>
        <div>
          If you decide to refuse any shipments from The Shoebox, you are responsible for the original shipping charges to you, any duties, taxes and/or customs charges that are incurred on the package (on both the original and return shipments), and the cost of returning the package to The Shoebox.
        </div>
        <h4>TRANSIT TIMES </h4>
        <ul className="list">
          <li>Standard Shipping: 3-6 business days *</li>
        </ul>
        * Delivery times include processing and delivery. Express delivery will ship the same day on orders placed before 12pm (EST). Shipping to remote locations may take longer.
      </div>
    </div>
  );
}

export default Shipping;
