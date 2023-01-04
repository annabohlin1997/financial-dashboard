import "../styles/card.css";

export default function Card({ savings, date, icon, text }) {
	return(
		<div className="card">
			<div>
				<p className="savings">{savings}</p>
				<p className="date">{date}</p>
			</div>
			<div>
				<div className="icon">
					<img src={icon} alt=""></img>
				</div>
				<h3 className="text">{text}</h3>
			</div>
		</div>
	);
}