import React, { useState } from "react";
import { Button } from "../button/Button";

const musculos = [
  "Adutor curto",
  "Adutor longo",
  "Adutor magno",
  "Ancôneo",
  "Bíceps braquial",
  "Bíceps femoral (cabeça longa)",
  "Bíceps femoral (cabeça curta)",
  "Braquial",
  "Braquiorradial",
  "Deltoide anterior",
  "Deltoide lateral",
  "Deltoide posterior",
  "Diafragma",
  "Dorsal (ou grande dorsal)",
  "Eretor da espinha",
  "Extensor radial curto do carpo",
  "Extensor radial longo do carpo",
  "Extensor ulnar do carpo",
  "Fibular curto",
  "Fibular longo",
  "Flexor radial do carpo",
  "Flexor ulnar do carpo",
  "Gastrocnêmio (cabeça lateral)",
  "Gastrocnêmio (cabeça medial)",
  "Glúteo máximo",
  "Glúteo médio",
  "Glúteo mínimo",
  "Grácil",
  "Ilíaco",
  "Infraespinhal",
  "Manguito rotador (infraespinhal)",
  "Manguito rotador (redondo menor)",
  "Manguito rotador (subescapular)",
  "Manguito rotador (supraespinhal)",
  "Oblíquo externo",
  "Oblíquo interno",
  "Palmar longo",
  "Peitoral maior",
  "Peitoral menor",
  "Piriforme",
  "Psoas maior",
  "Psoas menor",
  "Quadrado lombar",
  "Quadríceps (reto femoral)",
  "Quadríceps (vasto intermédio)",
  "Quadríceps (vasto lateral)",
  "Quadríceps (vasto medial)",
  "Reto abdominal",
  "Romboide maior",
  "Romboide menor",
  "Serrátil anterior",
  "Semimembranoso",
  "Semitendíneo",
  "Sóleo",
  "Subescapular",
  "Supinador",
  "Supraespinhal",
  "Tensor da fáscia lata",
  "Tibial anterior",
  "Tibial posterior",
  "Trapézio (inferior)",
  "Trapézio (médio)",
  "Trapézio (superior)",
  "Transverso do abdômen",
];

export const Input = ({
  name,
  id,
  setText,
  placeholder,
  value,
  error,
  isValid = false,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {name}
      </label>
      <input
        onChange={(e) => setText(e.target.value)}
        type="text"
        id={id}
        value={value}
        name={id}
        className={`w-full pl-5 pr-10 py-2 h-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--button-default)] focus:border-[var(--button-focus)] outline-none bg-[var(--input-default)] text-black
            ${
              isValid && error
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 dark:border-gray-600"
            }
          `}
        placeholder={placeholder}
      />
      {isValid && error && (
        <p className="mt-1 text-sm text-red-500">{`O campo "${placeholder}" é obrigatório`}</p>
      )}
    </div>
  );
};

export const InputVideo = ({ name, id, setUrl, placeholder, value }) => {
  const onChangeUrl = (url) => {
    const match = url.match(/^(?:[^\/]*\/){3}([^?]+)/);
    if (!!match) {
      setUrl(match[1]);
    } else {
      setUrl(url);
    }
  };
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {name}
      </label>
      <input
        onChange={(e) => onChangeUrl(e.target.value)}
        type="text"
        id={id}
        value={value}
        name={id}
        className="w-full pl-5 pr-10 py-2 h-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--button-default)] focus:border-[var(--button-focus)] outline-none bg-[var(--input-default)] text-black"
        placeholder={placeholder}
      />
    </div>
  );
};

export const InputImagem = ({ name, id, images, setImage, placeholder }) => {
  const [img, setImg] = useState("");

  const handleSaveImagem = () => {
    if (img.trim() === "") return;
    const updatedImages = images;
    updatedImages.push(img);
    setImage(updatedImages);
    setImg("");
  };

  const handleDeleteImage = (url) => {
    const newArray = images.filter((image, i) => image !== url);
    setImage(newArray);
  };

  return (
    <div>
      {!!images.length && (
        <div className="border rounded-sm p-1 flex-wrap flex flex-row gap-2">
          {images.map((url, i) => (
            <div
              key={i}
              className="shadow-sm "
              onClick={() => handleDeleteImage(url)}
            >
              <BgImage image={url} size={"w-16 h-16"} showIcon />
            </div>
          ))}
        </div>
      )}
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {name}
      </label>
      <div className="flex flex-row items-center gap-2">
        <input
          onChange={(e) => setImg(e.target.value)}
          value={img || ""}
          type="text"
          id={id}
          name={id}
          className="mt-1 block w-full border pl-1 h-[35px] rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder={placeholder}
        />
        {images.length <= 2 && (
          <a
            onClick={handleSaveImagem}
            className="bg-blue-600 h-[35px] flex items-center mt-1 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            save
          </a>
        )}
      </div>
    </div>
  );
};

export const Textarea = ({ name, id, setText, placeholder, value }) => {
  return (
    <div>
      <label
        htmlFor="message"
        className="block text-sm font-medium text-gray-700"
      >
        {name}
      </label>
      <textarea
        onChange={(e) => setText(e.target.value)}
        id={id}
        name={id}
        value={value}
        rows="4"
        className="w-full pl-5 pr-10 py-2 h-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--button-default)] focus:border-[var(--button-focus)] outline-none bg-[var(--input-default)] text-black"
        placeholder={placeholder}
      ></textarea>
    </div>
  );
};

export const Select = ({ name, setMuscles, muscles, options }) => {
  const [selected, setSelected] = useState([]);
  const handleSaveSelected = () => {
    const updatedMuscle = [...muscles, selected];
    setMuscles(updatedMuscle);
  };

  const handleDeleteMuscle = (muscle) => {
    const newArray = muscles.filter((_muscle, i) => _muscle !== muscle);
    setMuscles(newArray);
  };

  return (
    <div className="">
      {!!muscles?.length && (
        <div className="border rounded-sm p-1 flex flex-wrap">
          {muscles.map((muscle, i) => (
            <div
              onClick={() => handleDeleteMuscle(muscle)}
              key={i}
              className="text-sm border rounded-md p-[2px] m-[2px] flex flex-row gap-2 items-center"
            >
              <div>{muscle}</div>
              <div>x</div>
            </div>
          ))}
        </div>
      )}
      <label
        htmlFor="message"
        className="block text-sm font-medium text-gray-700"
      >
        {name}
        <div className="flex flex-row items-center gap-2 ">
          <select
            onChange={(e) => setSelected(e.target.value)}
            className="w-full pl-5 pr-10 py-2 h-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--button-default)] focus:border-[var(--button-focus)] outline-none bg-[var(--input-default)] text-black"
          >
            {musculos.map((musculo, i) => (
              <option key={i} value={musculo}>
                {musculo}
              </option>
            ))}
          </select>
          <a
            onClick={handleSaveSelected}
            className="bg-blue-600 text-white py-2 px-4 mt-1 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            save
          </a>
        </div>
      </label>
    </div>
  );
};

export const SelectExercise = ({
  name,
  setExercises,
  exercises,
  options = [],
}) => {
  const [selected, setSelected] = useState([]);
  const handleSaveSelected = () => {
    const exe = options.find((op) => op.name === selected);
    const updatedExercise = [...exercises, exe];
    setExercises(updatedExercise);
  };

  const handleDeleteMuscle = (uuid) => {
    const newArray = exercises.filter((_exe, i) => _exe.uuid !== uuid);
    setExercises(newArray);
  };

  return (
    <div className="">
      {!!exercises?.length && (
        <div className="border rounded-sm p-1 flex flex-wrap">
          {exercises.map((_exer, i) => (
            <div
              onClick={() => handleDeleteMuscle(_exer.uuid)}
              key={i}
              className="text-sm border rounded-md p-[2px] m-[2px] flex flex-row gap-2 items-center"
            >
              <div>{_exer.name}</div>
              <div>
                <IconCircleClose />
              </div>
            </div>
          ))}
        </div>
      )}
      <label
        htmlFor="message"
        className="block text-sm font-medium text-gray-700"
      >
        {name}
        <div className="flex flex-row items-center gap-2 ">
          <select
            onChange={(e) => setSelected(e.target.value)}
            className="w-full pl-5 pr-10 py-2 h-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--button-default)] focus:border-[var(--button-focus)] outline-none bg-[var(--input-default)] text-black"
          >
            {options.map((exer, i) => (
              <option key={i} value={exer.name}>
                {exer.name}
              </option>
            ))}
          </select>
          <a
            onClick={handleSaveSelected}
            className="bg-blue-600 text-white py-2 px-4 mt-1 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            save
          </a>
        </div>
      </label>
    </div>
  );
};

export const Form = ({ children, create }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    create();
  };
  return (
    <form
      method="POST"
      className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg space-y-4"
    >
      {children}
      <Button onClick={handleSubmit} text="Cadastrar Categoria" />
    </form>
  );
};
