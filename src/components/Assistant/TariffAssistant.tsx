import { useEffect, useState, type FormEvent } from 'react';
import { answerQuestion, openingBrief } from '../../assistant/advise';
import type { Product } from '../../types';
import './assistant.css';

const SUGGESTIONS = ['La más barata', 'Mejor nota', 'Sin franquicia', 'Compara'];

interface Exchange {
  question: string;
  answer: string;
}

const TariffAssistant = ({ products }: { products: Product[] }) => {
  const [draft, setDraft] = useState('');
  const [exchange, setExchange] = useState<Exchange | null>(null);
  const brief = openingBrief(products);
  const visibleIds = products.map((product) => product.id).join('|');

  useEffect(() => {
    setExchange(null);
  }, [visibleIds]);

  const ask = (question: string) => {
    const text = question.trim();
    if (!text) return;
    setExchange({ question: text, answer: answerQuestion(text, products) });
    setDraft('');
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    ask(draft);
  };

  return (
    <section className="ai-assistant" aria-label="Asistente de tarifas">
      <div className="ai-assistant-kicker">
        <span className="ai-live" />
        Lectura en vivo
      </div>
      <h1>Qué tarifa conviene ahora</h1>
      <p className="ai-brief">{brief}</p>
      <div className="ai-suggestions">
        {SUGGESTIONS.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            className={
              exchange?.question === suggestion ? 'ai-chip is-active' : 'ai-chip'
            }
            onClick={() => ask(suggestion)}
          >
            {suggestion}
          </button>
        ))}
      </div>
      {exchange && (
        <article className="ai-answer" key={exchange.question}>
          <p className="ai-answer-question">{exchange.question}</p>
          <p>{exchange.answer}</p>
        </article>
      )}
      <form className="ai-composer" onSubmit={onSubmit}>
        <label className="ai-sr" htmlFor="ai-question">
          Pregunta al asistente
        </label>
        <input
          id="ai-question"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Pregunta por una compañía, el precio o la franquicia"
        />
        <button type="submit">Consultar</button>
      </form>
    </section>
  );
};

export default TariffAssistant;
