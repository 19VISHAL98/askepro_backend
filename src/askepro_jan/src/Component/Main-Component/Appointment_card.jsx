import React from "react";
import { Grid, Icon } from "semantic-ui-react";
import "../../Sass/Sass-Main/_Appointment_card.scss";
import "../../Sass/Sass-Main/_Admin_dashboard.scss";
import Reject from "../Main-Component/Reject";
import Accept from "../Main-Component/Accept";
const Appointment_card = () => {
  return (
    <>
      <div className="border_appointment">
        <Grid columns>
          <Grid.Column>
            <div className="appoint_card">
              <div className="appoint_card content">
                <div className="content6">
                  <p>
                    Dummy text , appointment with AMER executive in Dubai Media
                    City
                  </p>
                  <span className="date_time">23 Jan 2021, 11:00 - 12:00</span>
                </div>
              </div>
              <div className="action-icon">
               
                <Reject />
                <Accept />
              </div>
            </div>
          </Grid.Column>
        </Grid>
      </div>
    </>
  );
};

export default Appointment_card;
