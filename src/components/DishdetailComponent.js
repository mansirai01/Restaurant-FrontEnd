import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Label} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => !(val) || (val.length >= len);

class CommentForm extends Component{
    constructor(props) {
        super(props);

        this.state = {
            modal: false
        };
        
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({ modal: !this.state.modal});
      }
    handleSubmit(values) {
    console.log("Current state is: " + JSON.stringify(values));
    alert("Curren state is: " + JSON.stringify(values));
    }

    render(){
        
    return (
        <div>
        <Button outline color="secondary" onClick={this.toggle}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} >
            <ModalHeader toggle={this.toggle}>Submit Comment</ModalHeader>
            <ModalBody >
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
            <Row className="form-group">
                <Label htmlFor="rating" md={2}>Rating</Label>
                <Col md={12}>
                <Control.select model=".rating" name="rating"
                    className="form-control">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </Control.select>
                </Col> 
            </Row>
            <Row className="form-group">
            <Label htmlFor="author" md={4}>Your Name</Label>
            <Col md={12}>
                <Control.text model=".author" id="author" name="author"
                    placeholder="Your Name"
                    className="form-control"
                    validators={{
                        required, minLength: minLength(3), maxLength: maxLength(15)
                    }}
                />
                <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                        required: 'Required',
                        minLength: 'Must be greater than 2 characters',
                        maxLength: 'Must be 15 characters or less'
                    }}
                />
                </Col>
            </Row>
            <Row className="form-group">
                <Label htmlFor="comment" md={2} >Comment</Label>
                <Col md={12}>
                <Control.textarea model=".comment" id="comment" name="comment" rows="6"
                    className="form-control" />
                </Col>       
            </Row>
            <Row className="form-group" > 
                <Col>
                <Button className="ml-0" color="primary" onClick={this.toggle}>Submit</Button>
                </Col> 
            </Row>
            </LocalForm>
            </ModalBody>
        </Modal>
        </div>
    );
    }
}

function RenderDish({dish}){

    return(
    <Card>
        <CardImg top width="100%" src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
    </Card>
    );
}

function RenderComments({comments}){
    
    if (comments != null){
        return(
            <div>
                <h4> Comments </h4>
                <ul class="list-unstyled">
                {comments.map((comment)=>( 
                    <li>
                        <div class="mt-3">{comment.comment}</div>
                        <div class="mt-3">
                            -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                        </div>
                    </li>))}
                </ul>
                <div><CommentForm/></div>
            </div>
        );
     }
    else{
         return(
        <div></div>
        );
    }
}
  
const  DishDetail = (props) => {
       const dish = props.chosenDish;

     if (dish != null){
    return(
        <div className="container">
                <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
                </div>
        );
  }
              
else{
    return(
        <div></div>
    );
  }

}

export default DishDetail;