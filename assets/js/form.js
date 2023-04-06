import toast from "./toast.js";


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {
    addDoc,
    collection,
    getFirestore
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBaEM2HXHWCVujYdzfsrptg7CIunUr3398",
    authDomain: "hadilao-53d16.firebaseapp.com",
    projectId: "hadilao-53d16",
    storageBucket: "hadilao-53d16.appspot.com",
    messagingSenderId: "1091581471876",
    appId: "1:1091581471876:web:6706dd3fa7cb457ba9e6d1",
    measurementId: "G-Z2CBQ8KQ2Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const form = document.querySelector("#form-order")
form.onsubmit = (e) => {
    e.preventDefault();
    const name = form.querySelector('#name').value
    const locate = form.querySelector('#locate').value
    const tel = form.querySelector('#tel').value
    const num_adult = form.querySelector('#num_adult').value
    const num_child = form.querySelector('#num_child').value
    const date = form.querySelector('#date').value
    const note = form.querySelector('#note').value
    if (name.trim() === "") {
        toast({ message: "Hãy điền đầy đủ tên", title: "Có lỗi", type: "error" })
        return;
    }
    if (locate.trim() === "") {
        toast({ message: "Hãy chọn cơ sở", title: "Có lỗi", type: "error" })
        return;
    }
    if (tel.trim() === "") {
        toast({ message: "Hãy điền số điện thoại", title: "Có lỗi", type: "error" })
        return;
    }
    if (date.trim() === "") {
        toast({ message: "Hãy điền ngày", title: "Có lỗi", type: "error" })
        return;
    }

    if (num_adult.trim() === "") {
        toast({ message: "Hãy điền số lượng người lớn", title: "Có lỗi", type: "error" })
        return;
    }
    if (num_child.trim() === "") {
        toast({ message: "Hãy điền số lượng trẻ em", title: "Có lỗi", type: "error" })
        return;
    }

    if (dayjs(date) < dayjs()) {
        toast({ message: "Ngày giờ bạn chọn đang ở quá khứ", title: "Cảnh báo", type: "warning" })
    }
    (async () => {
        try {
            await addDoc(collection(db, "Orders"), { name, num_adult: Number(num_adult), num_child: Number(num_child), locate, date: dayjs(date).format("DD/MM/YYYY hh:mm A"), tel, note });
            toast({ message: "Bạn đã đặt bàn thành công!", title: "Thành công", type: "success" })
            form.querySelector('#name').value=""
            form.querySelector('#locate').value=""
            form.querySelector('#tel').value=""
            form.querySelector('#num_adult').value=""
            form.querySelector('#num_child').value=""
            form.querySelector('#date').value=""
            form.querySelector('#note').value=""
        }
        catch {
            toast({ message: "Đặt bàn không thành công!", title: "Có lỗi", type: "error" })

        }
    })()

}