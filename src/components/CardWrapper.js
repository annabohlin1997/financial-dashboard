import Card from './Card';
import SectionTitle from './SectionTitle';

import "../styles/card-wrapper.css";


export default function CardWrapper() {
	return (
		<div className="wrapper">
			<SectionTitle title="Goals" icon="/src/assets/icons/misc/plus-circle.svg"></SectionTitle>
			<Card className="mountain" savings="$550" date="12/20/20" icon="/mountain.svg" text="Holidays"/>
			<Card className="paintbrush" savings="$200" date="12/20/20" icon="/paintbrush.svg" text="Renovation"/>
			<Card className="xbox" savings="$820" date="12/20/20" icon="/xbox.svg" text="Xbox"/>
		</div>
	);
}