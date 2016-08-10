/// <reference path="../../typings/index.d.ts" />

class MyPageModel extends Backbone.Model {

    constructor(args) {
        super(args);
    }
}
class MyPage extends Backbone.View<MyPageModel> {

    constructor(args) {
        super(args);
        console.log('mypage');
    }
}
