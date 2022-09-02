import { Button, notification } from "antd";
import styled from "@emotion/styled";
import React from "react";

class ButtonClassComponent extends React.Component{
    StandardButton = styled(Button)(() => ({
        padding: "5px 10px",
        color: "white",
        backgroundColor:'red',
        borderRadius:'50px',
        borderColor:'red',
        ":hover": {
          color: "red",
          backgroundColor: "white",
          borderColor: "red",
        },
      }));

    openNotification = () => {
        notification.open({
          message: "Your new day added",
          description: "Now you can see the newly added in the list",
        });
      };

    render() {

        return (
            <div className="button-for-class">
                <this.StandardButton htmlType="submit" onClick={this.openNotification} >Click to add new day!</this.StandardButton>
            </div>
        )
    }
}

export default ButtonClassComponent