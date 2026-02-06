//Section cards are individual components in the Editor Panel for entering inputs
//Section card is made collapsible using isOpen

import "./Editor.css";
import "../../App.css";
import { useState } from "react";

// Reusable section wrapper
// Props: title -> section header, children -> inputs inside section

const SectionCard = ({ title, children, onRemove }) => {

    // Card is made collapsible. isOpen = true indicates the card is open. Initially all cards are closed
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="editor-section">
            <div className="editor-section-header" onClick={() => setIsOpen(!isOpen)}>
                <h3>{title}</h3>
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    {/* Remove button only for custom sections */}
                    {onRemove && (
                        <button className="remove-btn" onClick={(e) => {
                                e.stopPropagation(); // prevent collapse toggle
                                onRemove();
                            }}
                        >
                            ✕
                        </button>
                    )}
                    <span>{isOpen ? "-" : "+"}</span>
                </div>
            </div>
            {isOpen && <div className="editor-section-body">{children}</div>}
        </div>
    )
}

export default SectionCard;