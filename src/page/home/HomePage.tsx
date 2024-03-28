import { useEffect, useMemo, useState } from "react";
import "./HomePage.scss";
import { Avatar, Button } from "antd";
import { setInfoCard, storeRedux } from "../../redux/store-redux";
export default function HomePage() {
  const [check, setCheck] = useState(true);
  const [dataCard, setDataCard] = useState([
    {
      name: "Son",
      age: "24",
      address: "HaNoi",
      avatar: require("../../assets/images/logo-pwa.png"),
    },
    {
      name: "Nam",
      age: "23",
      address: "Hai Duong",
      avatar: require("../../assets/images/logo-pwa.png"),
    },
    {
      name: "Hung",
      age: "22",
      address: "Nam Dinh",
      avatar: require("../../assets/images/logo-pwa.png"),
    },
    {
      name: "Lien",
      age: "24",
      address: "HaNoi",
      avatar: require("../../assets/images/logo-pwa.png"),
    },
  ]);

  const initCard = useMemo(() => {
    return dataCard;
  }, [check]);

  const handleEdit = (e: string, label: string, index: number) => {
    setDataCard((prev) => {
      const newArr = [...prev];
      newArr[index] = {
        ...newArr[index],
        [label]: e,
      };
      return newArr;
    });
  };
  useEffect(() => {
    storeRedux.dispatch(setInfoCard(dataCard));
  }, [check, dataCard]);
  const checkDisable = () => {
    return dataCard.every((item, index) => {
      const initItem = initCard[index];
      return (
        item.name === initItem.name &&
        item.age === initItem.age &&
        item.address === initItem.address &&
        item.avatar === initItem.avatar
      );
    });
  };

  return (
    <div className="container-redux">
      <img src="" alt="" />
      <div className="box-ex">
        <h1> Trang chủ Redux 2: </h1>
        <div className="button-box">
          <Button
            type="primary"
            disabled={checkDisable() ? true : false}
            onClick={() => setCheck(!check)}
          >
            Confirm
          </Button>
          <Button
            disabled={checkDisable() ? true : false}
            onClick={async () => {
              await setDataCard(initCard);
              setCheck(!check);
            }}
          >
            {" "}
            Reset{" "}
          </Button>
        </div>
        <div className="info-card">
          {dataCard.map((item, index) => {
            return (
              <div key={index} className="item-card">
                <div className="avatar">
                  <Avatar size={124} src={item.avatar} />
                </div>
                <div className="text-info">
                  <div>
                    Tên:{" "}
                    <p
                      suppressContentEditableWarning={true}
                      contentEditable={true}
                      onBlur={(e) =>
                        handleEdit(e.target.innerText, "name", index)
                      }
                    >
                      {item.name}
                    </p>
                  </div>
                  <div>
                    Tuổi:{" "}
                    <p
                      suppressContentEditableWarning={true}
                      contentEditable={true}
                      onBlur={(e) =>
                        handleEdit(e.target.innerText, "age", index)
                      }
                    >
                      {item.age}
                    </p>
                  </div>
                  <div>
                    Địa Chỉ:{" "}
                    <p
                      suppressContentEditableWarning={true}
                      contentEditable={true}
                      onBlur={(e) =>
                        handleEdit(e.target.innerText, "address", index)
                      }
                    >
                      {item.address}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
