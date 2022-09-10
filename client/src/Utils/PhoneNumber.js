import React, { useEffect, useState } from "react";
import Popover from '@idui/react-popover'

const PhoneNumber=(props)=>{
    const [phones,setPhones]=useState([]);
    useEffect(()=>{
        let phoneArr=[];
        if(props.phones)
        {
            props.phones.map((phone)=>{
                phoneArr.push(phone.phone)
            });
            setPhones(phoneArr);
        }
    },[props.phones])
    const phoneContent=(phones)=>{
        return (
            <div>{
                phones.map((phone)=>{
                    return <div key={`phone-no-${phone}`} className="tr-phone">{phone}</div>
                })
            }
            </div>
        )
    }

    return(
        <>
            {
                phones.length>1?<Popover animation={{animate: {opacity: 1,scale: 1},exit: {opacity: 0,scale: 0.9,transition: {duration: 0.1}},initial: {opacity: 0,scale: 0.9}}} closeOnEnter content={phoneContent(phones)} fitMaxHeightToBounds fitMaxWidthToBounds offset={[0,0]} onFocus={function noRefCheck(){}} trigger="click">
                    <u>{`[${phones.join(", ")}]`}</u>
                </Popover>:phones
            }
        </>
    )
}
export default PhoneNumber;