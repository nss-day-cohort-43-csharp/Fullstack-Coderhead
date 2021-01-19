import React, { useContext, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
    Form,
    FormGroup,
    Card,
    CardBody,
    CardHeader,
    Input,
    Button,
} from "reactstrap";

export const CommentList = ({ postComments }) => {
    return (
        <div className="float-left">
            {postComments.map((postComment) => (
                <Card key={postComment.id}>
                    <CardHeader>{postComment.subject}</CardHeader>
                    <CardBody>
                        {postComment.content}
                    </CardBody>
                    <Button color="info"
                    // onClick={ }
                    >
                        Delete
            </Button>
                    <Button color="info"
                    // onClick={ }
                    >
                        Edit
            </Button>

                </Card>
            ))}
        </div>
    );

}
