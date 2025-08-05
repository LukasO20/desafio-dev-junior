'use client';

/*

- VisibilityProvider gerencia o estado de visibilidade com base na class dos elementos da DOM
- Métodos disponíveis:
    toggleVisibility - alterar entre adicionar ou remover com auxilio de "updateVisibility" e "removeVisibility"

Estrutura de parametervisible = {
    - class: String class alvo a ser manipulada no array "visibleElements"
    - operator:  {
        mantain: String class alvo a ser fixada (não se altera) no array "visibleElements"
    }
}

*/

import { useState, createContext, useContext } from 'react'

const VisibilityContext = createContext([]);

export function VisibilityProvider ({ children }) {
    const [visibleElements, setVisibleElement] = useState([])

    const setSafeVisibleElement = (updateFn) => {
        setVisibleElement((prev) => {
            const safeValue = updateFn(prev) ?? []
            return Array.isArray(safeValue) ? safeValue : []
        })
    }

    const updateVisibility = (visible) => {
        setSafeVisibleElement((prev) => {
            const classType = Array.isArray(visible.class);
            if (classType) return visible.class;   
        })
    }

    const removeVisibility = (visible) => {
        setSafeVisibleElement((prev) => {
            const classType = Array.isArray(visible.class);

            if (visible.operator.maintain) return visible.class        
            if (classType) return prev.filter(classPrevious => visible.class.some(el => el !== classPrevious));          
        })
    }

    //Alterna classes do array com updateVisibility e removeVisibility
    const toggleVisibility = (visible, event) => {
        event?.stopPropagation();
        const parametervisible = {
            class: visible?.class ?? null, 
            operator: {
                maintain: visible?.operator?.maintain ?? false
            }
        };
        const isVisible = visibleElements.some(classes => {
            const classType = Array.isArray(parametervisible.class)

            if (classType) return parametervisible.class.includes(classes);       
        });
        isVisible ? removeVisibility(parametervisible) : updateVisibility(parametervisible);
    }

    return (
        <VisibilityContext.Provider value={{ visibleElements, toggleVisibility }}>
            {children}
        </VisibilityContext.Provider>
    )
}

export const useVisibility = () => useContext(VisibilityContext);