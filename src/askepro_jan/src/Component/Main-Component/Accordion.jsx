import React, { Component } from "react";
import {getData} from '../../services/api';
import {Link} from 'react-router-dom';
import { Accordion, Grid, Icon, Container } from "semantic-ui-react";
export default class AccordionExampleFluid extends Component {
  state = { activeIndex: 0 };

  constructor() {
    super();
    this.state = { data: [] };
  }

  async componentDidMount() {
    try {
    let response = await fetch(`${process.env.REACT_APP_BASE_URL}/faqs`);
    const json = await response.json();
    this.setState({ data: json.data }); 
    } catch (error) {
      console.log(error);
    }
  }
  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { activeIndex } = this.state;

    return (

      <>

      <Container>
          <div className="accordion">
          
            <h1 className="headingOne">Frequently Asked Questions</h1>
           
          </div>
          <Accordion>
            {this.state.data.map((el,index) =>
              <div className="accordion_section">
                <Accordion.Title
                  active={activeIndex === index}
                  index={index}
                  onClick={this.handleClick}
                >
                  <div className="accordion_gap">
                    <Grid>
                      <Grid.Column width={4}>
                        <img src="Assets/images/question.png" width="32px" />
                      </Grid.Column>
                      <Grid.Column width={8}>
                        {el.title}
                      </Grid.Column>
                      <Grid.Column width={4}>
                        <img src="Assets/images/plus.png" width="24px" />
                      </Grid.Column>
                    </Grid>
                  </div>
                </Accordion.Title>
                <Accordion.Content active={activeIndex === index}>
                  <div className="accord_content">
                    <p>{el.description}
                    </p>
                  </div>
                </Accordion.Content>
              </div>
            )}
          </Accordion>

          <div className="question">
          <Link to="/apply"><button className="same-btn">
              APPLY NOW
            </button></Link>
       
          </div>
        </Container>
      </>
    );
  }
}
