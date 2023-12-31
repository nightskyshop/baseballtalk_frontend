import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "./PostForm.module.css";
import axios from "axios";

export default function PostForm() {
  const router = useRouter();
  const [ok, setOk] = useState(false);

  const createPost = async (title, content, author) => {
    await axios.post("http://localhost:8080/post", {
      title, content, author
    })
      .then((res) => (
        res.status == 201 ? setOk(true) : setOk(false)
      ));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target.name);
    const form = e.currentTarget;
    const title = form.elements.namedItem("title").value;
    const content = form.elements.namedItem("content").value;

    if (title == "" || content == "") {
      window.alert("제목과 내용을 채워주세요.")
    } else {
      await createPost(title, content, 1);
    }

    if (ok) {
      router.push("/post");
    }
  };

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <div className={styles.form__header}>
        <h1>게시판 글쓰기</h1>
        <button>등록</button>
      </div>

      <div className={styles.form__team}>
        <div className={styles.form__selects}>
          <div className={styles.form__select}>
            <select name="team">
              <option value="">팀를 선택해주세요.</option>
              <option vlaue="LG Twins">LG Twins</option>
              <option vlaue="KT Wiz">KT Wiz</option>
              <option vlaue="SSG Landers">SSG Landers</option>
              <option vlaue="NC Dinos">NC Dinos</option>
              <option vlaue="Doosan Bears">Doosan Bears</option>
              <option vlaue="KIA Tigers">KIA Tigers</option>
              <option vlaue="Lotte Giants">Lotte Giants</option>
              <option vlaue="Samsung Lions">Samsung Lions</option>
              <option vlaue="Hanwha Eagles">Hanwha Eagles</option>
              <option vlaue="Kiwoom Heros">Kiwoom Heros</option>
            </select>
            <FontAwesomeIcon icon={faCaretDown} />
          </div>
          
          <div className={styles.form__select}>
            <select name="category">
              <option value="">주제를 선택해주세요.</option>
            </select>
            <FontAwesomeIcon icon={faCaretDown} />
          </div>
        </div>

        <input
          type="text"
          placeholder="제목을 입력해 주세요."
          name="title"
          className={styles.form__title}
        />
      </div>

      <textarea
        type="text"
        placeholder="내용을 입력해 주세요."
        name="content"
        className={styles.form__content}
      />
    </form>
  )
};