# Issues
## TODOs
- DocumentEditComponent
    - when arrow fn is used, the SafeSubscriber is the actual bounded context. for now it's resolved by common fn and bind(this)
- BaseGateway
    - implement correct unsubscribing of ReplaySubject with additional unsubscribing of original Firebase subscription
- EditableTextareaComponent
    - bug with broken variable projection after complete removing of the string
- Jest warning: "[Vue warn]: Cannot find element: #app"
    - just annoying stuff in console because the actual return result is successful
## Other
- SCSS shared global variables support
    - WebStorm can not resolve webpack alias for scss files
    - can help [https://vue-loader-v14.vuejs.org/ru/configurations/pre-processors.html]