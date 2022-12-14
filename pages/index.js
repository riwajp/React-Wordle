import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [form_data, setFormData] = useState({ tries: 5, word_length: 5 });
  //========================================

  const handleTriesChange = (v) => {
    console.log(v);
    //only allow values between 4 and 30, inclusively
    if (v >= 4 && v <= 30) {
      setFormData({ ...form_data, tries: v });
    }
  };
  //========================================

  const handleSubmit = () => {
    console.log(form_data);
  };
  //========================================

  return (
    <div className="home_container">
      <div className="home_title">Wordle</div>
      <div className="home_menu">
        <div className="home_menu_item">
          <div className="form_label">Word Length</div>
          <select
            className="form_select"
            value={form_data.word_length}
            onChange={(e) =>
              setFormData({ ...form_data, word_length: e.target.value })
            }
          >
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
          </select>
        </div>

        <div className="home_menu_item">
          <div className="form_label">Tries</div>
          <input
            type="number"
            min={4}
            max={30}
            className="form_number"
            value={form_data.tries}
            onChange={(e) => handleTriesChange(e.target.value)}
          />
        </div>

        <div className="home_menu_item">
          <Link
            href={{
              pathname: "/game",
              query: form_data, // the data
            }}
          >
            <button className="form_submit" onClick={() => handleSubmit()}>
              Play
            </button>
          </Link>

          <div
            style={{
              color: "white",
              fontSize: 20,
              textDecoration: "underline",
              marginTop: 20,
              textAlign: "center",
            }}
          >
            <a
              href="https://mashable.com/article/wordle-word-game-what-is-it-explained"
              target={"_blank"}
            >
              How to play?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
