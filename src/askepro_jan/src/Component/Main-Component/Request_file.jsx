import React from "react";
import { Grid, Segment } from "semantic-ui-react";

const Requst_file = () => {
  return (
    <>

      <div className="Request_bg">
        <Grid columns>
          <Grid.Column>
            <div className="request3">
              <p>
                Dummy text , appointment with AMER executive in Dubai Media City
              </p>
              <Grid column={2}>
                <Grid.Row>
                  <Grid.Column width={8}>
                    <span className="date_time">
                      23 Jan 2021, 11:00 - 12:00
                    </span>
                  </Grid.Column>
                  <Grid.Column floated="right" width={4}>
                    <p className="para6">View Details</p>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </div>
          </Grid.Column>
        </Grid>
      </div>
    </>
  );
};

export default Requst_file;
