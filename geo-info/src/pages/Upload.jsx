import React, { useState } from "react";
import { FaBars, FaTimes, FaTelegramPlane, FaInstagram, FaYoutube } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Используем useNavigate для v6

const FileUpload = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [file, setFile] = useState(null); // Состояние для файла
  const [message, setMessage] = useState(""); // Сообщение о результате загрузки
  const [loading, setLoading] = useState(false); // Состояние для индикатора загрузки
  const [imageUrl, setImageUrl] = useState(""); // Состояние для хранения URL изображения

  // Создание истории для перехода на страницу анализа
  const navigate = useNavigate(); // Для навигации

  // Обработчик изменения файла
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      // Генерация URL для предварительного просмотра изображения
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  // Обработчик загрузки
  const handleUpload = () => {
    if (!file) {
      setMessage("Пожалуйста, выберите файл для загрузки.");
      return;
    }

    setLoading(true); // Запуск индикатора загрузки

    // Эмуляция загрузки с задержкой
    setTimeout(() => {
      setLoading(false); // Остановка индикатора загрузки
      setMessage(`Файл "${file.name}" успешно загружен!`);
    }, 3000); // 3 секунды задержки для эмуляции загрузки

    // Сохранение файла в локальном хранилище (localStorage) или контексте
    localStorage.setItem("uploadedFile", JSON.stringify({ name: file.name, url: imageUrl }));
  };

  // Переход на страницу анализа
  const goToAnalysisPage = () => {
    navigate("/analysis"); // Переход на страницу анализа
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Навигация */}
      <header className="absolute w-full bg-white flex justify-between items-center p-5 z-50">
        <h1 className="text-3xl font-bold text-[#052c46]">ГеоИнфо</h1>

        {/* Десктопное меню */}
        <nav className="hidden md:flex space-x-8">
          <a href="/" className="text-black text-2xl font-medium hover:text-blue-700">Главная</a>
          <a href="/map" className="text-black text-2xl font-medium hover:text-blue-700">Карта</a>
          <a href="/analysis" className="text-black text-2xl font-medium hover:text-blue-700">Анализ</a>
          <a href="/library" className="text-black text-2xl font-medium hover:text-blue-700">Учебные материалы</a>
        </nav>

        {/* Гамбургер-меню */}
        <div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl text-black">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </header>

      {/* Мобильное меню */}
      {menuOpen && (
        <div className="absolute top-0 left-0 w-full h-screen bg-black bg-opacity-80 flex flex-col items-center justify-center space-y-6 md:hidden z-40">
          <a href="/" className="text-white text-3xl" onClick={() => setMenuOpen(false)}>Главная</a>
          <a href="/map" className="text-white text-3xl" onClick={() => setMenuOpen(false)}>Карта</a>
          <a href="/analysis" className="text-white text-3xl" onClick={() => setMenuOpen(false)}>Анализ</a>
          <a href="/library" className="text-white text-3xl" onClick={() => setMenuOpen(false)}>Учебные материалы</a>
        </div>
      )}

      {/* Основной контент страницы загрузки */}
      <div className="w-full py-12 bg-gray-100 mt-24"> {/* Отступ сверху для контента */}
        <div className="max-w-screen-xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center">Загрузка спутниковых снимков</h2>
          <p className="mt-4 text-lg text-center">
            Загрузите ваши спутниковые снимки для анализа и обработки.
          </p>

          {/* Форма загрузки файла */}
          <div className="flex justify-center mt-8">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
              {/* Выбор файла */}
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full py-2 px-4 border border-gray-300 rounded mb-4"
                accept=".jpg, .png, .tiff"
              />
              {/* Кнопка загрузки */}
              <button
                onClick={handleUpload}
                className="w-full bg-blue-600 text-white text-xl py-3 rounded hover:bg-blue-700"
              >
                Загрузить файл
              </button>
              {/* Индикатор загрузки */}
              {loading && (
                <div className="mt-4 flex justify-center">
                  <div className="w-12 h-12 border-4 border-t-4 border-blue-600 rounded-full animate-spin"></div>
                </div>
              )}
              {/* Сообщение и изображение */}
              {message && (
                <div className="mt-4 text-center text-lg text-green-600">
                  {message}
                </div>
              )}
              {imageUrl && !loading && (
                <div className="mt-6 flex justify-center">
                  <img src={imageUrl} alt="Preview" className="max-w-full max-h-80 object-contain" />
                </div>
              )}
              {/* Кнопка перехода на страницу анализа */}
              <button
                onClick={goToAnalysisPage}
                className="w-full bg-blue-600 text-white text-xl py-3 rounded hover:bg-blue-700 mt-6"
              >
                Перейти к анализу
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Футер */}
      <footer className="w-full bg-white text-black py-10">
        <div className="w-full max-w-screen-2xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div>
              <h3 className="text-xl font-bold">О проекте</h3>
              <p className="text-black mt-2">
                ГеоИнфо — сервис для анализа спутниковых снимков и геопространственных данных.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold">Контакты</h3>
              <p className="text-black">example@example.com</p>
              <p className="text-black">+7 (123) 455-75-80</p>
            </div>

            <div>
              <h3 className="text-xl font-bold">Документы</h3>
              <a href="#" className="text-black hover:underline">
                Политика конфиденциальности
              </a>
            </div>

            <div>
              <h3 className="text-xl font-bold">Мы в соцсетях</h3>
              <div className="flex space-x-4 mt-2">
                <a
                  href="https://t.me/yourchannel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-blue-500 text-2xl"
                  aria-label="Telegram"
                >
                  <FaTelegramPlane />
                </a>
                <a
                  href="https://instagram.com/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-pink-500 text-2xl"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://youtube.com/yourchannel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-red-600 text-2xl"
                  aria-label="YouTube"
                >
                  <FaYoutube />
                </a>
              </div>
            </div>
          </div>

          <hr className="mt-8" />

          <div className="text-black text-center mt-6">
            © 2025 ГеоИнфо. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FileUpload;
