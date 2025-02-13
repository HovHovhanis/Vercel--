// app/api/submit-task/route.js
export async function POST(req) {
  const data = await req.json();
  console.log("Received data:", data);

  const { title, description, budget_from, budget_to, deadline_days, token } = data;

  // Проверка наличия обязательных данных
  if (!token) {
    return new Response(JSON.stringify({ message: 'Ошибка: токен отсутствует' }), { status: 400 });
  }
  if (!title || !description || !budget_from || !budget_to || !deadline_days) {
    return new Response(JSON.stringify({ message: 'Ошибка: все поля должны быть заполнены' }), { status: 400 });
  }

  // Пример успешного ответа
  return new Response(JSON.stringify({ message: 'Задача успешно опубликована' }), { status: 200 });
}
