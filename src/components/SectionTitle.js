import "../styles/section-title.css";

export default function SectionTitle({title, icon}) {
	return (
		<div className="section-title">
			<h2 className="title">{title}</h2>
			<div className="icon">
					<img src={icon} alt=""></img>
			</div>
		</div>
	)
}