import React from 'react';
import {
  Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody
} from "reactstrap";
import { LocalForm, Control } from "react-redux-form";
import { Link } from "react-router-dom";

class CommentForm extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      isModalOpen: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  handleSubmit(values) {
    this.toggleModal();
    this.props.addComment(
      this.props.campsiteId,
      values.rating,
      values.author,
      values.text
    );
  }

  render() {
    return (
      <React.Fragment>
        <Button className="fa fa-pencil" outline>
          Submit Comment
        </Button>

        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="rating">Rating</label>
              </div>
            </LocalForm>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}
     
function RenderCampsite({campsite}) {
            return (
              <div className="col-md-5 m-1">
                  <Card>
                    <CardImg top src={campsite.image} alt={campsite.name} />
                    <CardBody>
                      <CardText>{campsite.description}</CardText>
                    </CardBody>
                  </Card>
              </div>
            );
        }
    

function RenderComments({comments}){
    if(comments) {
        return(
            <div className="col-md-5 m-1">
                <h4>Comments</h4>
                { comments.map(shit => {
                    return (
                            <div>
                                <p>{shit.text}</p>
                                <p>{shit.rating}</p>
                                <p>-- {shit.author}{' '}
                                    {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'})
                                        .format(new Date(Date.parse(shit.date)))}
                                </p>
                            </div>
                        );
                    })}
                <CommentForm />
            </div>
        );
    }
    return <div/> 
}


function CampsiteInfo(props) {
  if (props.campsite) {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/directory">Directory</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
            </Breadcrumb>
            <h2>{props.campsite.name}</h2>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderCampsite campsite={props.campsite} />
          <RenderComments comments={props.comments} />
       
        </div>
      </div>
    );
  }
  return <div />;
}

export default CampsiteInfo;