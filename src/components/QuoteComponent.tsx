import { Section } from "../nkp/book";

interface QuoteComponentProps {
    section: Section;
    paragraph: string;
}

const QuoteComponent = ({section, paragraph}: QuoteComponentProps) => {
    return (
        <div className="quote">
            <div className="quote__author">{section.getAuthor()}</div>
            <div className="quote__title">{section.getTitle()}</div>
            <div className="quote__paragraph">{paragraph}</div>
        </div>
    );
}

export default QuoteComponent;