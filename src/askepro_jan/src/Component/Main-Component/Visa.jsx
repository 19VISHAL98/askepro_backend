import React from "react";
import { Grid, Container } from "semantic-ui-react";
import { useHistory,Link } from "react-router-dom";

const Visa = () => {
  const service_url = `${process.env.REACT_APP_BASE_URL}/serviceCategory`;
  const history = useHistory();
  const [services, setServices] = React.useState(null);

  React.useEffect(() => {
    getServices();
  }, []);

  const getServices = async () => {
    const services = await (await fetch(service_url, { method: "GET" })).json();
 
    let serviceData = services?.data?.map((e) => ({
      _id: e._id,
      name: e.name,
      tv_type: e.tv_type,
      scode: e.scode,
      slug: e.slug,
      // serviceDetail: e.serviceDetail,
      image:e.image
    }));
    serviceData=serviceData?.reverse(); 
    setServices(serviceData);
    console.log(serviceData)
  };
console.log(services);
  return (
    <>
      <div className='visa_container'>
        <Grid stackable columns={4}>
          {services &&
            services.map((service) => (
              <Grid.Column>
                <div
                  className="service-card"
                  onClick={() =>{service.name===("COMPANY STAMP") || service.name===("PRO SERVICES") || service.name===("DUBAI ECONOMIC SERVICES") || service.name===("COMPANY FORMATION")?history.push(`/contact`) :history.push(`/service/${service.slug}`)}} data-aos="fade-up" data-aos-anchor-placement="top-bottom"
                >
                  {/* <img src={process.env.PUBLIC_URL + "/Assets/images/building.png"}/> */}
                  <img src={"data:image/png;base64," + service.image}/>
                  <p>{service.name}</p>
                </div>
              </Grid.Column>
            ))}

          <Grid.Column width={8}><Link to="/contact">
            <div className="service-card2" data-aos="fade-up" data-aos-anchor-placement="top-bottom">
              <img src={process.env.PUBLIC_URL+"/Assets/images/stamp.png"} />
              <p>
                Didn't find what you were looking for? Contact us we will help
                you out.
              </p>
            </div></Link>
          </Grid.Column>
        </Grid>

        {/* <div className="tourist">
          <h1 className="headingOne">Tourist Visa Services</h1>

          <Grid stackable columns={4}>
            <Grid.Row>
            
            { services && services.map((d) => {
              if (d.tv_type) {
                return (
                  <Grid.Column width={4}>
                    <div className="tourist-border" onClick={() => history.push(`/service/${d.slug}`)}>
                      <div className="hours">
                        <h3>{d.serviceDetail.hours ? d.serviceDetail.hours : 96 } Hours</h3>
                        <p className="transit">Transit Visa + Insurance (Covid)</p>
                      </div>
                      <div className="hours-content">
                        <div className="rectangle11">
                          <div className="days-dull">Processing Time :</div>
                          <div className="days">Upto {d.serviceDetail.processT} Days</div>
                        </div>
                        <div className="rectangle11">
                          <div className="days-dull">Stay Period :</div>
                          <div className="days">{d.serviceDetail.stayPeriod} Days</div>
                        </div>
                        <div className="rectangle11">
                          <div className="days-dull">Validity :</div>
                          <div className="days">{d.serviceDetail.validity} Days</div>
                        </div>
                        <div className="rectangle11">
                          <div className="days-dull">Entry :</div>
                          <div className="days">{d.serviceDetail.entry}</div>
                        </div>
                      </div>
                      <div className="hours-total">
                        <div className="fees">
                          <div className="total-left">Fees</div>
                          <div className="total-right">{d.serviceDetail.price} AED</div>
                        </div>
                      </div>
                    </div>
                  </Grid.Column>
                )
              }
            }
            )}
            
              
            </Grid.Row>
          </Grid>
        </div> */}
      </div>
    </>
  );
};

export default Visa;
