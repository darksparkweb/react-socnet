import profileReducer from './profileReducer';
import dialogsReducer from './dialogsReducer';


let store = {
  _state: {
    profilePage: {
      posts: [
        { id: 1, like: 15, dislike: 1, message: "My name is Valerian" },
        { id: 2, like: 22, dislike: 2, message: "And I wanna be a front-end developer",},
        { id: 3, like: 33, dislike: 3, message: "I'm really like it!" },
        { id: 4, like: 44, dislike: 4, message: "It's really cool!" },
        { id: 5, like: 55, dislike: 5, message: "Peace and Love" },
      ],
      newPostText: "",
    },
    dialogsPage: {
      dialogs: [
        { id: 1, name: "John Smith" },
        { id: 2, name: "Jim Carry" },
        { id: 3, name: "Angelina Jolly" },
        { id: 4, name: "Vasa Bell" },
        { id: 5, name: "Petia" },
      ],
      messages: [
        { id: 1, message: "yo" },
        { id: 2, message: "How are you?" },
        { id: 3, message: "yo" },
        { id: 4, message: "When is your birthday?" },
        { id: 5, message: "yo" },
      ],
      newMessageText: "",
    },
    friendsPage: {
      friends: [
        {
          id: 1,
          name: "Jim Carry",
          ava:
            "https://static.intercomassets.com/avatars/154019/square_128/Latest_Portrait_Picture_copy-1457639563-1462417921-1462472262.jpg?1462472262",
        },
        {
          id: 2,
          name: "Angelina Jolly",
          ava: "https://a.wattpad.com/useravatar/AVAROSE-.256.790397.jpg",
        },
        {
          id: 3,
          name: "John Smith",
          ava: "https://wecodetheweb.com/img/ava.jpg",
        },
        {
          id: 4,
          name: "Vasa Bell",
          ava: "https://www.theplace.ru/archive/00_icons/7259_icon_128.jpg",
        },
        {
          id: 5,
          name: "Jacky Chan",
          ava:
            "https://static.intercomassets.com/avatars/147128/square_128/photo-1485404213.png?1485404213",
        },
        {
          id: 6,
          name: "Vinnie Puh",
          ava:
            "https://c-sf.smule.com/rs-s79/arr/27/af/41325905-c838-4a6f-9037-b92aab00f65e.jpg",
        },
        {
          id: 7,
          name: "Jim Carry",
          ava:
            "https://static.intercomassets.com/avatars/154019/square_128/Latest_Portrait_Picture_copy-1457639563-1462417921-1462472262.jpg?1462472262",
        },
        {
          id: 8,
          name: "Jim Carry",
          ava:
            "https://static.intercomassets.com/avatars/154019/square_128/Latest_Portrait_Picture_copy-1457639563-1462417921-1462472262.jpg?1462472262",
        },
        {
          id: 9,
          name: "Jim Carry",
          ava:
            "https://static.intercomassets.com/avatars/154019/square_128/Latest_Portrait_Picture_copy-1457639563-1462417921-1462472262.jpg?1462472262",
        },
        {
          id: 10,
          name: "Jim Carry",
          ava:
            "https://static.intercomassets.com/avatars/154019/square_128/Latest_Portrait_Picture_copy-1457639563-1462417921-1462472262.jpg?1462472262",
        },
        {
          id: 11,
          name: "Jim Carry",
          ava:
            "https://static.intercomassets.com/avatars/154019/square_128/Latest_Portrait_Picture_copy-1457639563-1462417921-1462472262.jpg?1462472262",
        },
        {
          id: 12,
          name: "Jim Carry",
          ava:
            "https://static.intercomassets.com/avatars/154019/square_128/Latest_Portrait_Picture_copy-1457639563-1462417921-1462472262.jpg?1462472262",
        },
      ],
    },
  },
  _callSubscriber() {
    console.log("Store changed");
  },

  getState() {
    return this._state;
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action)
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
    this._callSubscriber(this._state);
  }
};


 
  



window.store = store;
