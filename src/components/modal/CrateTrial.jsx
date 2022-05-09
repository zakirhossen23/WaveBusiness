import React,{ useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CurrencyDollarIcon from "@heroicons/react/solid/CurrencyDollarIcon";


export default function CreateTrialModal({
    show,
    onHide

}) {

    async function CreateTrial(e) {
        e.preventDefault();
        const { title, description, image, createBTN } = e.target;
        var notificationSuccess = e.target.children[0].firstChild;
        var notificationError = e.target.children[0].lastChild;
        createBTN.children[0].classList.remove("hidden")
        createBTN.children[1].innerText = ""
        createBTN.disabled = true;
        try {
            let current = new Date();
            let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
            let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
            let dateTime = cDate + ' ' + cTime;
            await fetch(`https://cors-anyhere.herokuapp.com/https://test.i.tgcloud.io:14240/restpp/query/WaveData/CreateTrial?imageTXT=${encodeURIComponent(image.value)}&titleTXT=${encodeURIComponent(title.value)}&descriptionTXT=${encodeURIComponent(description.value)}&contributorsTXT=0&audienceTXT=0&budgetTXT=0&dateTXT=${encodeURIComponent(dateTime)}`, {
                "headers": {
                    "accept-language": "en-US,en;q=0.9",
                    "Authorization": "Bearer n63cf58df61rvnp6dgeq4a4rolokeoe8",
                },
                "body": null,
                "method": "GET"
            }).then(e2 => {
                notificationSuccess.style.display = "block";
                createBTN.children[0].classList.add("hidden")
                createBTN.children[1].innerText = "Create Courses"
                title.value = "";
                description.value = "";
                image.value = "";

                createBTN.disabled = false;
            }).catch((error) => {
                notificationError.style.display = "none";
                createBTN.children[0].classList.add("hidden");
                createBTN.children[1].innerText = "Create Courses";
                createBTN.disabled = false;
            });
        } catch (error) {

        }
        createBTN.children[0].classList.add("hidden")
        createBTN.children[1].innerText = "Create Courses";
        createBTN.disabled = false;
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header  >
                <Modal.Title id="contained-modal-title-vcenter">
                    Create Courses
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">
                <Form onSubmit={CreateTrial}>
                    <Form.Group className="mb-3 grid" controlId="formGroupName">
                        <div id='notificationSuccess' name="notificationSuccess" style={{ display: 'none' }} className="mt-4 text-center bg-gray-200 relative text-gray-500 py-3 px-3 rounded-lg">
                            Success!
                        </div>
                        <div id='notificationError' name="notificationError" style={{ display: 'none' }} className="mt-4 text-center bg-red-200 relative text-red-600 py-3 px-3 rounded-lg">
                            Error! Please try again!
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-3 grid" controlId="formGroupName">
                        <Form.Label>Title</Form.Label>
                        <input required name="title" placeholder="Title" id="title" className="border rounded pt-2 pb-2 border-gray-400 pl-4 pr-4" />
                    </Form.Group>
                    <Form.Group className="mb-3 grid" controlId="formGroupName">
                        <Form.Label>Description</Form.Label>
                        <textarea required name="description" placeholder="Description" id="description" className="border rounded pt-2 pb-2 border-gray-400 pl-4 pr-4" />
                    </Form.Group>
                    <Form.Group className="mb-3 grid" controlId="formGroupName">
                        <Form.Label>Image</Form.Label>
                        <input required name="image" placeholder="Image link" id="image" className="border rounded pt-2 pb-2 border-gray-400 pl-4 pr-4" />
                    </Form.Group>
        
                    <div className="d-grid">
                        <Button name="createBTN" type='submit' style={{ 'display': 'flex' }} className='w-3/12 h-12 flex justify-center items-center' variant='outline-dark' >
                            <i id='LoadingICON' name='LoadingICON' className="select-none block w-12 m-0 fa fa-circle-o-notch fa-spin hidden"></i>
                            <span id='buttonText'>Create Courses</span>
                        </Button>
                    </div>
                </Form>
            </Modal.Body>

        </Modal>

    );
}