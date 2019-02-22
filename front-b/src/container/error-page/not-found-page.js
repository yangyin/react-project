import React from 'react';
import ErrorPage from './error-page';




export function NotFoundPage() {
    return (
        <ErrorPage src="404" data={{num:404,desc:'抱歉，你访问的页面不存在'}} />
    )
}

export function Unauthorized() {
    return (
        <ErrorPage src="403" data={{num:403,desc:'抱歉，你无权访问该页面'}} />
    )
}

export function NotServerPage() {
    return (
        <ErrorPage src="500" data={{num:500,desc:'抱歉，服务器出错了'}} />
    )
}