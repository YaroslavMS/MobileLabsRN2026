// data/newsData.js
export const generateNews = (page = 1, pageSize = 10) => {
  const categories = ['Технології', 'Наука', 'Спорт', 'Освіта', 'Культура'];
  const titles = [
    'Новий прорив у штучному інтелекті',
    'Випускник ЖДТУ отримав престижну нагороду',
    'Відкриття нової лабораторії робототехніки',
    'Міжнародна конференція з кібербезпеки',
    'Студентський стартап отримав інвестиції'
  ];
  
  const news = [];
  const startId = (page - 1) * pageSize;
  
  for (let i = 0; i < pageSize; i++) {
    const id = startId + i + 1;
    news.push({
      id: id.toString(),
      title: `${titles[id % titles.length]} ${id}`,
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.`,
      image: `https://picsum.photos/id/${100 + id}/400/200`,
      category: categories[id % categories.length],
      date: new Date(Date.now() - id * 86400000).toLocaleDateString('uk-UA'),
      views: Math.floor(Math.random() * 10000)
    });
  }
  return news;
};

export const initialNews = generateNews(1, 10);