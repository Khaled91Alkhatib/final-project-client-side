import React from "react";
import "../styles/Homepage.scss";

const Homepage = () => {
  return (
    <div>
      <div className="image-container">
        <img className="main-image" src="../main-image.png" alt="main-image" />
        <div className="text-in-image">Enjoy Our Collection</div>
      </div>
      <div className="text-under-image">
        <div className="open-location">
          Our Eaton Center location is open for Curbside Pickup, in-store
          shopping and delivery.
        </div>
        <br />
        <div>
          The Shoebox is offering <strong>Free Shipping</strong> on all
          purchases. Please note the possibility of shipping delays due to
          unforeseen circumstances.
        </div>
        <br />
        <div>
          Thank you for your patience and support. Stay safe and comfortable.
        </div>
      </div>
      <div className="map-and-info">
        <iframe
          className="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.6986270210223!2d-79.38288808463959!3d43.65443817912116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b34cb510746bd%3A0x8b89147b8cbbc837!2sCF%20Toronto%20Eaton%20Centre!5e0!3m2!1sen!2sca!4v1658681841011!5m2!1sen!2sca"
        ></iframe>
        <div className="location-and-hours">
          <strong className="location">
            Location:
            <br />
          </strong>
          Eaton Center
          <br />
          220 Yonge St, Toronto, ON M5B 2H1
          <br />
          <br />
          <br />
          <strong className="hours">
            Shop Hours:
            <br />
          </strong>
          Monday - Friday: 10 - 5
          <br />
          Saturday: 10 - 6
          <br />
          Sunday: 10 - 4
        </div>
      </div>
      <br />
      <br />
      <div className="complimentary-info">
        <div className="compliment-title">
          <strong>Complimentary Boot Care Service:</strong>
        </div>
        <br />
        <div>
          Complimentary boot cleaning, polishing and conditioning service is
          available at our locations for our customers. (even if you purchased
          your boots from another retailer!).{" "}
        </div>
        <br />
        <div>
          Please note the cleaning portion of this service applies to the upper
          of the boots only and not the sole. Please ensure the soles of your
          dropped-off boots are free of mud, debris and other organic material.
        </div>
        <br />
        <div>
          This service is now a drop-off service with a 24 to 72-hour turnaround
          to allow adequate time for us to take care of your boots. Please limit
          boots to 3 pairs per customer at a time. We encourage you to call the
          store before you drop by to double-check they have capacity and to
          avoid disappointment.
        </div>
      </div>
    </div>
  );
};

export default Homepage;