import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function ActiveLink({children, activeLinkClass, ...props}) {

    const {pathname} = useRouter()
    let className = children.props.className || ""
    if(pathname === props.href ) {
        className = ` ${activeLinkClass ? activeLinkClass : "mr-6 text-rose-500 font-semibold hover:text-rose-900"} `
    }

    return(
        <Link {...props}>
        {
            React.cloneElement(children, {className})
        }
        </Link>
    )
}