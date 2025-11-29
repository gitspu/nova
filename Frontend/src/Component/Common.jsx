
import React, { useEffect, useState }            from 'react';
import flattenChildren  from 'react-keyed-flatten-children'
import styled           from 'styled-components'
import icon             from '../Script/Icon'
import Navigator from '../Script/Navigator';
import { auth, decodeContent, profile, util } from '../Script/Api';
import { Activity } from 'react';

export const H1 = styled.h1 `
    color: ${props => 
        props.$variant == 'secondary' ? 'var(--app-text-2)' : 
        props.$variant == 'tertiary'  ? 'var(--app-text-3)' : 
        props.$variant == 'warning'   ? 'var(--app-text-warning)' : 
        props.$variant == 'caution'   ? 'var(--app-text-caution)' : 
        'var(--app-text-1)'
    };
    font-size: ${props => 
        props.$size == 'h1' ? 'var(--app-size-h1)' : 
        props.$size == 'h2' ? 'var(--app-size-h2)' : 
        props.$size == 'h3' ? 'var(--app-size-h3)' : 
        props.$size == 'h4' ? 'var(--app-size-h4)' : 
        props.$size == 'h5' ? 'var(--app-size-h5)' : 
        props.$size == 'h6' ? 'var(--app-size-h6)' : 
        props.$size == 'text' ? 'var(--app-size-text)' : 
        'var(--app-size-h1)'
    };
    font-weight: bold;

    text-align: ${props => props.$align != null ? props.$align : 'left' };

    margin: 0;
    padding: 0;
`;
export const H2 = styled.h2 `
     color: ${props => 
        props.$variant == 'secondary' ? 'var(--app-text-2)' : 
        props.$variant == 'tertiary'  ? 'var(--app-text-3)' : 
        props.$variant == 'warning'   ? 'var(--app-text-warning)' : 
        props.$variant == 'caution'   ? 'var(--app-text-caution)' : 
        'var(--app-text-1)'
    };
    font-size: ${props => 
        props.$size == 'h1' ? 'var(--app-size-h1)' : 
        props.$size == 'h2' ? 'var(--app-size-h2)' : 
        props.$size == 'h3' ? 'var(--app-size-h3)' : 
        props.$size == 'h4' ? 'var(--app-size-h4)' : 
        props.$size == 'h5' ? 'var(--app-size-h5)' : 
        props.$size == 'h6' ? 'var(--app-size-h6)' : 
        props.$size == 'text' ? 'var(--app-size-text)' : 
        'var(--app-size-h2)'
    };
    font-weight: bold;

    text-align: ${props => props.$align != null ? props.$align : 'left'};

    margin: 0;
    padding: 0;
`;
export const H3 = styled.h2 `
     color: ${props => 
        props.$variant == 'secondary' ? 'var(--app-text-2)' : 
        props.$variant == 'tertiary'  ? 'var(--app-text-3)' : 
        props.$variant == 'warning'   ? 'var(--app-text-warning)' : 
        props.$variant == 'caution'   ? 'var(--app-text-caution)' : 
        'var(--app-text-1)'
    };
    font-size: ${props => 
        props.$size == 'h1' ? 'var(--app-size-h1)' : 
        props.$size == 'h2' ? 'var(--app-size-h2)' : 
        props.$size == 'h3' ? 'var(--app-size-h3)' : 
        props.$size == 'h4' ? 'var(--app-size-h4)' : 
        props.$size == 'h5' ? 'var(--app-size-h5)' : 
        props.$size == 'h6' ? 'var(--app-size-h6)' : 
        props.$size == 'text' ? 'var(--app-size-text)' : 
        'var(--app-size-h3)'
    };
    font-weight: bold;

    text-align: ${props => props.$align != null ? props.$align : 'left'};

    margin: 0;
    padding: 0;
`;
export const H4 = styled.h2 `
     color: ${props => 
        props.$variant == 'secondary' ? 'var(--app-text-2)' : 
        props.$variant == 'tertiary'  ? 'var(--app-text-3)' : 
        props.$variant == 'warning'   ? 'var(--app-text-warning)' : 
        props.$variant == 'caution'   ? 'var(--app-text-caution)' : 
        'var(--app-text-1)'
    };
    font-size: ${props => 
        props.$size == 'h1' ? 'var(--app-size-h1)' : 
        props.$size == 'h2' ? 'var(--app-size-h2)' : 
        props.$size == 'h3' ? 'var(--app-size-h3)' : 
        props.$size == 'h4' ? 'var(--app-size-h4)' : 
        props.$size == 'h5' ? 'var(--app-size-h5)' : 
        props.$size == 'h6' ? 'var(--app-size-h6)' : 
        props.$size == 'text' ? 'var(--app-size-text)' : 
        'var(--app-size-h4)'
    };
    font-weight: bold;
    
    text-align: ${props => props.$align != null ? props.$align : 'left'};

    margin: 0;
    padding: 0;
`;
export const H5 = styled.h2 `
    color: ${props => 
        props.$variant == 'secondary' ? 'var(--app-text-2)' : 
        props.$variant == 'tertiary'  ? 'var(--app-text-3)' : 
        props.$variant == 'warning'   ? 'var(--app-text-warning)' : 
        props.$variant == 'caution'   ? 'var(--app-text-caution)' : 
        'var(--app-text-1)'
    };
    font-size: ${props => 
        props.$size == 'h1' ? 'var(--app-size-h1)' : 
        props.$size == 'h2' ? 'var(--app-size-h2)' : 
        props.$size == 'h3' ? 'var(--app-size-h3)' : 
        props.$size == 'h4' ? 'var(--app-size-h4)' : 
        props.$size == 'h5' ? 'var(--app-size-h5)' : 
        props.$size == 'h6' ? 'var(--app-size-h6)' : 
        props.$size == 'text' ? 'var(--app-size-text)' : 
        'var(--app-size-h5)'
    };
    font-weight: bold;

    text-align: ${props => props.$align != null ? props.$align : 'left'};

    margin: 0;
    padding: 0;
`;
export const H6 = styled.h2 `
     color: ${props => 
        props.$variant == 'secondary' ? 'var(--app-text-2)' : 
        props.$variant == 'tertiary'  ? 'var(--app-text-3)' : 
        props.$variant == 'warning'   ? 'var(--app-text-warning)' : 
        props.$variant == 'caution'   ? 'var(--app-text-caution)' : 
        'var(--app-text-1)'
    };
    font-size: ${props => 
        props.$size == 'h1' ? 'var(--app-size-h1)' : 
        props.$size == 'h2' ? 'var(--app-size-h2)' : 
        props.$size == 'h3' ? 'var(--app-size-h3)' : 
        props.$size == 'h4' ? 'var(--app-size-h4)' : 
        props.$size == 'h5' ? 'var(--app-size-h5)' : 
        props.$size == 'h6' ? 'var(--app-size-h6)' : 
        props.$size == 'text' ? 'var(--app-size-text)' : 
        'var(--app-size-h6)'
    };
    font-weight: bold;

    text-align: ${props => props.$align != null ? props.$align : 'left'};

    margin: 0;
    padding: 0;
`;
export const P = styled.p `
     color: ${props => 
        props.$variant == 'secondary' ? 'var(--app-text-2)' : 
        props.$variant == 'tertiary'  ? 'var(--app-text-3)' : 
        props.$variant == 'warning'   ? 'var(--app-text-warning)' : 
        props.$variant == 'caution'   ? 'var(--app-text-caution)' : 
        'var(--app-text-1)'
    };
    font-size: ${props => 
        props.$size == 'h1' ? 'var(--app-size-h1)' : 
        props.$size == 'h2' ? 'var(--app-size-h2)' : 
        props.$size == 'h3' ? 'var(--app-size-h3)' : 
        props.$size == 'h4' ? 'var(--app-size-h4)' : 
        props.$size == 'h5' ? 'var(--app-size-h5)' : 
        props.$size == 'h6' ? 'var(--app-size-h6)' : 
        props.$size == 'text' ? 'var(--app-size-text)' : 
        'var(--app-size-text)'
    };
    font-weight: ${props => props.$weight != null ? props.$weight : 'normal'};
    text-align: ${props => props.$align != null ? props.$align : 'left'};

    margin: 0;
    padding: 0;
`;
export const Label = styled.label `
    color: var(--app-text-1);
    font-size: ${props => props.$size != null ? `var(--app-size-${props.$size})` : 'var(--app-text-1)'};
    font-weight: ${props => props.$weight != null ? props.$weight : 'normal'};

    text-align: ${props => props.$align != null ? props.$align : 'left'};


    margin: 0;
    padding: 0;
`;
export const Ul = styled.ul `
    margin: 0;
    padding: 0;
    font-size: var(--app-size-text);

    color: ${props => 
        props.$variant == 'secondary' ? 'var(--app-text-2)' : 
        props.$variant == 'tertiary'  ? 'var(--app-text-3)' : 
        props.$variant == 'warning'   ? 'var(--app-text-warning)' : 
        props.$variant == 'caution'   ? 'var(--app-text-caution)' : 
        'var(--app-text-1)'
    };
`;
export const Li = styled.li`
    margin: 0;
    margin-left: 24px;
    padding: 0;
    font-size: var(--app-size-text);

    color: ${props => 
        props.$variant == 'secondary' ? 'var(--app-text-2)' : 
        props.$variant == 'tertiary'  ? 'var(--app-text-3)' : 
        props.$variant == 'warning'   ? 'var(--app-text-warning)' : 
        props.$variant == 'caution'   ? 'var(--app-text-caution)' : 
        'var(--app-text-1)'
    };
`;

export const Button = styled.button `

    background-color:   ${props => 
                            props.$variant == 'secondary' ? 'var(--app-button-2-bg)' :
                            props.$variant == 'tertiary' ? 'var(--app-button-3-bg)' :
                            props.$variant == 'warning' ? 'var(--app-button-warning-bg)' :
                            props.$variant == 'caution' ? 'var(--app-button-caution-bg)' :
                            props.$variant == 'outlined' ? 'var(--app-button-outlined-1-bg)'
                            : 'var(--app-button-1-bg)' 
                        };
    border:             ${props => 
                            props.$variant == 'secondary' ? 'var(--app-button-2-border)' :
                            props.$variant == 'tertiary' ? 'var(--app-button-3-border)' :
                            props.$variant == 'warning' ? 'var(--app-button-warning-border)' :
                            props.$variant == 'caution' ? 'var(--app-button-caution-border)' :
                            props.$variant == 'outlined' ? 'var(--app-button-outlined-1-border)'
                            : 'var(--app-button-1-border)' 
                        };
    border-radius:      ${props => 
                            props.$variant == 'secondary' ? 'var(--app-button-2-radius)' :
                            props.$variant == 'tertiary' ? 'var(--app-button-3-radius)' :
                            props.$variant == 'warning' ? 'var(--app-button-warning-radius)' :
                            props.$variant == 'caution' ? 'var(--app-button-caution-radius)' :
                            props.$variant == 'outlined' ? 'var(--app-button-outlined-1-radius)'

                            : 'var(--app-button-1-radius)' 
                        };
    outline:            ${props => 
                            props.$variant == 'secondary' ? 'var(--app-button-2-outline)' :
                            props.$variant == 'tertiary' ? 'var(--app-button-3-outline)' :
                            props.$variant == 'warning' ? 'var(--app-button-warning-outline)' :
                            props.$variant == 'caution' ? 'var(--app-button-caution-outline)' :
                            props.$variant == 'outlined' ? 'var(--app-button-outlined-1-outline)'

                            : 'var(--app-button-1-outline)' 
                        };
    color:              ${props => 
                            props.$variant == 'secondary' ? 'var(--app-button-2-text)' :
                            props.$variant == 'tertiary' ? 'var(--app-button-3-text)' :
                            props.$variant == 'warning' ? 'var(--app-button-warning-text)' :
                            props.$variant == 'caution' ? 'var(--app-button-caution-text)' :
                            props.$variant == 'outlined' ? 'var(--app-button-outlined-1-text)'
                            : 'var(--app-button-1-text)' 
                        };

    font-size:          var(--app-size-text);
    font-weight:        normal;
    margin:             0;
    padding:            var(--app-button-1-padding);

    transition-property:        background-color, color, outline;
    transition-duration:        250ms;
    transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);

    text-align: ${props => props.$align != null ? props.$align : 'center'};

    & > img
    {
        width: 32px;
        padding-right: 8px;
    }
    & > img:only-child
    {
        width: 32px;
        padding: 0px;
    }
    &:has(> label:only-child)
    {
        padding: 0px;

        & > label
        {
            padding:            var(--app-button-1-padding);
            color:              ${props => 
                        props.$variant == 'secondary' ? 'var(--app-button-2-text)' :
                        props.$variant == 'tertiary' ? 'var(--app-button-3-text)' :
                        props.$variant == 'warning' ? 'var(--app-button-warning-text)' :
                        props.$variant == 'caution' ? 'var(--app-button-caution-text)' :
                        props.$variant == 'outlined' ? 'var(--app-button-outlined-1-text)'
                        : 'var(--app-button-1-text)' 
                    };
        }
    }

    &:enabled:hover, &:enabled:focus
    {
        background-color:   ${props => 
                                props.$variant == 'secondary' ? 'var(--app-button-2-bg-hover)' :
                                props.$variant == 'tertiary' ? 'var(--app-button-3-bg-hover)' :
                                props.$variant == 'warning' ? 'var(--app-button-warning-bg-hover)' :
                                props.$variant == 'caution' ? 'var(--app-button-caution-bg-hover)' :
                                props.$variant == 'outlined' ? 'var(--app-button-outlined-1-bg-hover)'
                                : 'var(--app-button-1-bg-hover)' 
                            };
        border:             ${props => 
                                props.$variant == 'secondary' ? 'var(--app-button-2-border-hover)' :
                                props.$variant == 'tertiary' ? 'var(--app-button-3-border-hover)' :
                                props.$variant == 'warning' ? 'var(--app-button-warning-border-hover)' :
                                props.$variant == 'caution' ? 'var(--app-button-caution-border-hover)' :
                                props.$variant == 'outlined' ? 'var(--app-button-outlined-1-border-hover)'
                                : 'var(--app-button-1-border-hover)' 
                            };
        border-radius:      ${props => 
                                props.$variant == 'secondary' ? 'var(--app-button-2-radius-hover)' :
                                props.$variant == 'tertiary' ? 'var(--app-button-3-radius-hover)' :
                                props.$variant == 'warning' ? 'var(--app-button-warning-radius-hover)' :
                                props.$variant == 'caution' ? 'var(--app-button-caution-radius-hover)' :
                                props.$variant == 'outlined' ? 'var(--app-button-outlined-1-radius-hover)'
                                
                                : 'var(--app-button-1-radius-hover)' 
                            };
        outline:            ${props => 
                                props.$variant == 'secondary' ? 'var(--app-button-2-outline-hover)' :
                                props.$variant == 'tertiary' ? 'var(--app-button-3-outline-hover)' :
                                props.$variant == 'warning' ? 'var(--app-button-warning-outline-hover)' :
                                props.$variant == 'caution' ? 'var(--app-button-caution-outline-hover)' :
                                props.$variant == 'outlined' ? 'var(--app-button-outlined-1-outline-hover)'

                                : 'var(--app-button-1-outline-hover)' 
                            };
        color:              ${props => 
                                props.$variant == 'secondary' ? 'var(--app-button-2-text-hover)' :
                                props.$variant == 'tertiary' ? 'var(--app-button-3-text-hover)' :
                                props.$variant == 'warning' ? 'var(--app-button-warning-text-hover)' :
                                props.$variant == 'caution' ? 'var(--app-button-caution-text-hover)' :
                                props.$variant == 'outlined' ? 'var(--app-button-outlined-1-text-hover)'

                                : 'var(--app-button-1-text-hover)'
                            };
    }
    &:enabled:active
    {
        background-color:   ${props => 
                                props.$variant == 'secondary' ? 'var(--app-button-2-bg-active)' :
                                props.$variant == 'tertiary' ? 'var(--app-button-3-bg-active)' :
                                props.$variant == 'warning' ? 'var(--app-button-warning-bg-active)' :
                                props.$variant == 'caution' ? 'var(--app-button-caution-bg-active)' :
                                props.$variant == 'outlined' ? 'var(--app-button-outlined-1-bg-active)'
                                : 'var(--app-button-1-bg-active)' 
                            };
        border:             ${props => 
                                props.$variant == 'secondary' ? 'var(--app-button-2-border-active)' :
                                props.$variant == 'tertiary' ? 'var(--app-button-3-border-active)' :
                                props.$variant == 'warning' ? 'var(--app-button-warning-border-active)' :
                                props.$variant == 'caution' ? 'var(--app-button-caution-border-active)' :
                                props.$variant == 'outlined' ? 'var(--app-button-outlined-1-border-active)'

                                : 'var(--app-button-1-border-active)' 
                            };
        border-radius:      ${props => 
                                props.$variant == 'secondary' ? 'var(--app-button-2-radius-active)' :
                                props.$variant == 'tertiary' ? 'var(--app-button-3-radius-active)' :
                                props.$variant == 'warning' ? 'var(--app-button-warning-radius-active)' :
                                props.$variant == 'caution' ? 'var(--app-button-caution-radius-active)' :
                                props.$variant == 'outlined' ? 'var(--app-button-outlined-1-radius-active)'

                                : 'var(--app-button-1-radius-active)' 
                            };
        outline:            ${props => 
                                props.$variant == 'secondary' ? 'var(--app-button-2-outline-active)' :
                                props.$variant == 'tertiary' ? 'var(--app-button-3-outline-active)' :
                                props.$variant == 'warning' ? 'var(--app-button-warning-outline-active)' :
                                props.$variant == 'caution' ? 'var(--app-button-caution-outline-active)' :
                                props.$variant == 'outlined' ? 'var(--app-button-outlined-1-outline-active)'

                                : 'var(--app-button-1-outline-active)' 
                            };
        color:              ${props => 
                                props.$variant == 'secondary' ? 'var(--app-button-2-text-active)' :
                                props.$variant == 'tertiary' ? 'var(--app-button-3-text-active)' :
                                props.$variant == 'warning' ? 'var(--app-button-warning-text-active)' :
                                props.$variant == 'caution' ? 'var(--app-button-caution-text-active)' :
                                props.$variant == 'outlined' ? 'var(--app-button-outlined-1-text-active)'

                                : 'var(--app-button-1-text-active)'
                            };
    }
    &:disabled
    {
        background-color:   ${props => 
                                props.$variant == 'secondary' ? 'var(--app-button-2-bg-disabled)' :
                                props.$variant == 'tertiary' ? 'var(--app-button-3-bg-disabled)' :
                                props.$variant == 'warning' ? 'var(--app-button-warning-bg-disabled)' :
                                props.$variant == 'caution' ? 'var(--app-button-caution-bg-disabled)' :
                                props.$variant == 'outlined' ? 'var(--app-button-outlined-1-bg-disabled)'

                                : 'var(--app-button-1-bg-disabled)' 
                            };
        border:             ${props => 
                                props.$variant == 'secondary' ? 'var(--app-button-2-border-disabled)' :
                                props.$variant == 'tertiary' ? 'var(--app-button-3-border-disabled)' :
                                props.$variant == 'warning' ? 'var(--app-button-warning-border-disabled)' :
                                props.$variant == 'caution' ? 'var(--app-button-caution-border-disabled)' :
                                props.$variant == 'outlined' ? 'var(--app-button-outlined-1-border-disabled)'

                                : 'var(--app-button-1-border-disabled)' 
                            };
        border-radius:      ${props => 
                                props.$variant == 'secondary' ? 'var(--app-button-2-radius-disabled)' :
                                props.$variant == 'tertiary' ? 'var(--app-button-3-radius-disabled)' :
                                props.$variant == 'warning' ? 'var(--app-button-warning-radius-disabled)' :
                                props.$variant == 'caution' ? 'var(--app-button-caution-radius-disabled)' :
                                props.$variant == 'outlined' ? 'var(--app-button-outlined-1-radius-disabled)'

                                : 'var(--app-button-1-radius-disabled)' 
                            };
        outline:            ${props => 
                                props.$variant == 'secondary' ? 'var(--app-button-2-outline-disabled)' :
                                props.$variant == 'tertiary' ? 'var(--app-button-3-outline-disabled)' :
                                props.$variant == 'warning' ? 'var(--app-button-warning-outline-disabled)' :
                                props.$variant == 'caution' ? 'var(--app-button-caution-outline-disabled)' :
                                props.$variant == 'outlined' ? 'var(--app-button-outlined-1-outline-disabled)'

                                : 'var(--app-button-1-outline-disabled)' 
                            };
        color:              ${props => 
                                props.$variant == 'secondary' ? 'var(--app-button-2-text-disabled)' :
                                props.$variant == 'tertiary' ? 'var(--app-button-3-text-disabled)' :
                                props.$variant == 'warning' ? 'var(--app-button-warning-text-disabled)' :
                                props.$variant == 'caution' ? 'var(--app-button-caution-text-disabled)' :
                                props.$variant == 'outlined' ? 'var(--app-button-outlined-1-text-disabled)'

                                : 'var(--app-button-1-text-disabled)'
                            };
    }
    &:enabled > img
    {
        filter: ${props => 
                    props.$variant == 'secondary' ? 'var(--app-button-2-image-filter)' :
                    props.$variant == 'tertiary' ? 'var(--app-button-3-image-filter)' :
                    props.$variant == 'warning' ? 'var(--app-button-warning-image-filter)' :
                    props.$variant == 'caution' ? 'var(--app-button-caution-image-filter)' :
                    props.$variant == 'outlined' ? 'var(--app-button-outlined-1-image-filter)'
                    : 'var(--app-button-1-image-filter)'
                };
    }
    &:enabled:hover > img,&:enabled:focus > img
    {
        filter: ${props => 
                    props.$variant == 'secondary' ? 'var(--app-button-2-image-filter-hover)' :
                    props.$variant == 'tertiary' ? 'var(--app-button-3-image-filter-hover)' :
                    props.$variant == 'warning' ? 'var(--app-button-warning-image-filter-hover)' :
                    props.$variant == 'caution' ? 'var(--app-button-caution-image-filter-hover)' :
                    props.$variant == 'outlined' ? 'var(--app-button-outlined-1-image-filter-hover)'
                    : 'var(--app-button-1-image-filter-hover)'
                };
    }
    &:enabled:active > img
    {
        filter: ${props => 
                    props.$variant == 'secondary' ? 'var(--app-button-2-image-filter-active)' :
                    props.$variant == 'tertiary' ? 'var(--app-button-3-image-filter-active)' :
                    props.$variant == 'warning' ? 'var(--app-button-warning-image-filter-active)' :
                    props.$variant == 'caution' ? 'var(--app-button-caution-image-filter-active)' :
                    props.$variant == 'outlined' ? 'var(--app-button-outlined-1-image-filter-active)'
                    : 'var(--app-button-1-image-filter-active)'
                };
    }
    &:disabled > img
    {
        filter: ${props => 
                    props.$variant == 'secondary' ? 'var(--app-button-2-image-filter-disabled)' :
                    props.$variant == 'tertiary' ? 'var(--app-button-3-image-filter-disabled)' :
                    props.$variant == 'warning' ? 'var(--app-button-warning-image-filter-disabled)' :
                    props.$variant == 'caution' ? 'var(--app-button-caution-image-filter-disabled)' :
                    props.$variant == 'outlined' ? 'var(--app-button-outlined-1-image-filter-disabled)'
                    : 'var(--app-button-1-image-filter-disabled)'
                };
    }
`;

export const Input = styled.input `
    
    background-color:   var(--app-input-bg);
    border:             var(--app-input-border);
    border-radius:      var(--app-input-radius);
    outline:            var(--app-input-outline);
    color:              var(--app-input-text);

    padding:            var(--app-input-padding);
    height: 40px;

    transition-property:        background-color, color, outline;
    transition-duration:        250ms;
    transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);

    &:enabled:hover, &:enabled:focus
    {
        background-color:   var(--app-input-bg-hover);
        border:             var(--app-input-border-hover);
        border-radius:      var(--app-input-radius-hover);
        outline:            var(--app-input-outline-hover);
        color:              var(--app-input-text-hover);
    }
    &:enabled:active
    {
        background-color:   var(--app-input-bg-active);
        border:             var(--app-input-border-active);
        border-radius:      var(--app-input-radius-active);
        outline:            var(--app-input-outline-active);
        color:              var(--app-input-text-active);
    }
    &:disabled
    {
        background-color:   var(--app-input-bg-disabled);
        border:             var(--app-input-border-disabled);
        border-radius:      var(--app-input-radius-disabled);
        outline:            var(--app-input-outline-disabled);
        color:              var(--app-input-text-disabled);
    }

    &::placeholder, &::placeholder::enabled {
       color: var(--app-input-placeholder);          
    }
    &::placeholder:enabled:hover, &::placeholder:enabled:focus {
       color: var(--app-input-placeholder-hover);          
    }
    &::placeholder:enabled:active {
       color: var(--app-input-placeholder-active); 
    }
    &::placeholder:disabled {
       color: var(--app-input-placeholder-disabled); 
    }
`;
export const TextArea = styled.textarea `
    
    background-color:   var(--app-input-bg);
    border:             var(--app-input-border);
    border-radius:      var(--app-input-radius);
    outline:            var(--app-input-outline);
    color:              var(--app-input-text);

    padding:            var(--app-input-padding);
    height: 40px;
    resize: none;

    transition-property:        background-color, color, outline;
    transition-duration:        250ms;
    transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);

    &:enabled:hover, &:enabled:focus
    {
        background-color:   var(--app-input-bg-hover);
        border:             var(--app-input-border-hover);
        border-radius:      var(--app-input-radius-hover);
        outline:            var(--app-input-outline-hover);
        color:              var(--app-input-text-hover);
    }
    &:enabled:active
    {
        background-color:   var(--app-input-bg-active);
        border:             var(--app-input-border-active);
        border-radius:      var(--app-input-radius-active);
        outline:            var(--app-input-outline-active);
        color:              var(--app-input-text-active);
    }
    &:disabled
    {
        background-color:   var(--app-input-bg-disabled);
        border:             var(--app-input-border-disabled);
        border-radius:      var(--app-input-radius-disabled);
        outline:            var(--app-input-outline-disabled);
        color:              var(--app-input-text-disabled);
    }

    &::placeholder, &::placeholder::enabled {
       color: var(--app-input-placeholder);          
    }
    &::placeholder:enabled:hover, &::placeholder:enabled:focus {
       color: var(--app-input-placeholder-hover);          
    }
    &::placeholder:enabled:active {
       color: var(--app-input-placeholder-active); 
    }
    &::placeholder:disabled {
       color: var(--app-input-placeholder-disabled); 
    }
`;
export const A = styled.a `
    color: var(--app-link);
    text-decoration: none;

    &:hover, &:focus
    {
        color: var(--app-link-hover);
        text-decoration: underline;
    }
    &:active
    {
        color: var(--app-link-active);
        text-decoration: underline;
    }
    &:disabled
    {
        color: var(--app-link-disabled);
        text-decoration: none;
    }
`;
export const Div = styled.div `
    display: block;
`;
export const Span = styled.span `
    margin: 0;
    padding: 0;
`;
export const Code = styled.code `
    margin: 0;
    padding: 0;
`;
export const Header = styled.header `
    margin: 0;
    padding: 0;
`;
export const Main = styled.main `
    margin: 0;
    padding: 0;
`;
export const Footer = styled.footer `
    margin: 0;
    padding: 0;
`;
export const Section = styled.section `
    margin: 0;
    padding: 0;
`;
export const Form = styled.form `
    margin: 0;
    padding: 0;
`;
export const Hr = styled.hr `
    margin: 0;
    padding: 0;
`;
export const Img = styled.img `
    margin: 0;
    padding: 0;
    border: none;
    object-fit: contain;
`;
export const Br = styled.br `
    margin: 0;
    padding: 0;
`;
export const Table = styled.table `

    width: 100%;
    background-color: var(--app-table-bg);
    border-collapse: collapse;

    ${props => props.$clickable == true ? `

      & tbody tr:hover 
      {
          background-color: var(--app-table-click-bg);
          color: var(--app-table-click-text);
      }
      & tbody tr:active 
      {
          background-color: var(--app-table-click-bg-active);
          color: var(--app-table-click-text-active);
      }

    ` : ``}
`;
export const THead = styled.thead `
    background-color: var(--app-table-head-bg);
    font-weight: bold;
`;
export const TBody = styled.tbody `

`
export const Td = styled.td `
    padding: var(--app-table-padding);
    border: var(--app-table-border);

`;
export const Tr = styled.tr `

`;

const CheckboxRoot = styled.div `
    display: block;
    position: relative;
    margin: 0;
    padding: 0;
`;
const CheckboxInput = styled.input `

    position: absolute;
    top: 0px; bottom: auto;

    min-width: 24px !important; min-height: 24px !important;
    max-width: 24px !important; max-height: 24px !important;

    appearance: none;

    background-color: var(--app-checkbox-bg);
    border: var(--app-checkbox-border);
    border-radius: var(--app-checkbox-radius);
    outline: var(--app-checkbox-outline);

    &:enabled:hover , &:enabled:focus
    {
        background-color: var(--app-checkbox-bg-hover);
        border: var(--app-checkbox-border-hover);
        border-radius: var(--app-checkbox-radius-hover);
        outline: var(--app-checkbox-outline-hover);
    }
    &:enabled:active
    {
        background-color: var(--app-checkbox-bg-active);
        border: var(--app-checkbox-border-active);
        border-radius: var(--app-checkbox-radius-active);
        outline: var(--app-checkbox-outline-active);
    }
    &:disabled
    {
        background-color: var(--app-checkbox-bg-disabled);
        border: var(--app-checkbox-border-disabled);
        border-radius: var(--app-checkbox-radius-disabled);
        outline: var(--app-checkbox-outline-disabled);
    }
    &:checked
    {
      background-image: url("/Checkbox.png");
      filter: invert();
    }
`;

// ==================================================================================================== //
//                                                                                                      //
// CHECKBOX                                                                                             //
//                                                                                                      //
// ==================================================================================================== //

const CheckboxTitle = styled.label `

    display: block;
    margin: 0px 0px 0px 40px; align-content: center;

    min-height: 24px; max-height: 24px;

    color: var(--app-text-1);
    font-size: var(--app-size-text);
    font-weight: normal;
`;
const CheckboxSubtitle = styled.p `

    display: block;
    margin: 0px 0px 0px 40px;

    color: var(--app-text-2);
    font-size: var(--app-size-text);
    font-weight: normal;
`;

/**
 * ส่วนประกอบสำหรับการแสดงตัวเลือก พร้อมคำอธิบายประกอบ
*/
export const Checkbox = ({
    state /* [get, update] */, 
    title /* ชื่อหัวข้อ */, 
    subtitle /* คำอธิบายเพิ่มเติม */ = "",
    className,
    onChange
}) => 
{
    function injectGet ()
    {
        if (state == null)
            return false;

        return Boolean (state[0]);
    }
    function injectSet (event) 
    {
        // event.preventDefault ();
        const checked = Boolean (event.target.checked);

        if (state != null)
            state[1] (checked);

        if (onChange != null)
            onChange (event);
    }
    function modify (newValue)
    {
        if (state != null)
            state[1] (newValue);
    }

    return (
      <CheckboxRoot className={className} onClick={() => modify (!injectGet ())}>
          <CheckboxInput type='checkbox' 
                         checked={injectGet()}
                         onChange={injectSet}>
          </CheckboxInput>
          <CheckboxTitle>{title}</CheckboxTitle>
          <CheckboxSubtitle>{subtitle}</CheckboxSubtitle>
      </CheckboxRoot>
    );
}

// ==================================================================================================== //
//                                                                                                      //
// MENU BAR                                                                                             //
//                                                                                                      //
// ==================================================================================================== //


const MenuBarRoot = styled.div `

    ${props => props.$direction == 'horizontal' ? `

      width: 100%;
      height: auto;

        & button
        {
            text-align: start;

            height: 100%;
            margin-right: var(--app-spacing-4);
        }

      ` : ''}
    ${props => props.$direction == 'vertical' ? `

        width: 100%;
        height: auto;

        & button
        {
            text-align: start;

            width: 100%;
            height: 40px;
            margin-bottom: var(--app-spacing-4);
        }

        ` : ''}

    & .button-normal, & .button-active
    {
        padding: 8px;
        vertical-align: middle;

        transition-property:        background-color, color, outline;
        transition-duration:        250ms;
        transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);

        & > img
        {
            width: 24px;
            height: 24px;
            margin-right: var(--app-spacing-3);
        }
        & > span
        {
            height: 24px;
        }
    }

    & .button-normal:enabled
    {
        background-color:   var(--app-menubar-bg);
        border:             var(--app-menubar-border);
        border-radius:      var(--app-menubar-radius);
        outline:            var(--app-menubar-outline);
        color:              var(--app-menubar-text);

        & > img
        {
            filter: var(--app-menubar-image-filter);
        }
    }
    & .button-normal:enabled:hover, & .button-normal:enabled:focus
    {
        background-color:   var(--app-menubar-bg-hover);
        border:             var(--app-menubar-border-hover);
        border-radius:      var(--app-menubar-radius-hover);
        outline:            var(--app-menubar-outline-hover);
        color:              var(--app-menubar-text-hover);

        & > img
        {
            filter: var(--app-menubar-image-filter-hover);
        }
    }
    & .button-normal:enabled:active
    {
        background-color:   var(--app-menubar-bg-active);
        border:             var(--app-menubar-border-active);
        border-radius:      var(--app-menubar-radius-active);
        outline:            var(--app-menubar-outline-active);
        color:              var(--app-menubar-text-active);

        & > img
        {
            filter: var(--app-menubar-image-filter-active);
        }
    }
    & .button-normal:disabled
    {
        background-color:   var(--app-menubar-bg-disabled);
        border:             var(--app-menubar-border-disabled);
        border-radius:      var(--app-menubar-radius-disabled);
        outline:            var(--app-menubar-outline-disabled);
        color:              var(--app-menubar-text-disabled);

        & > img
        {
            filter: var(--app-menubar-image-filter-disabled);
        }
    }

    & .button-active:enabled
    {
        background-color:   var(--app-menubar-toggled-bg);
        border:             var(--app-menubar-toggled-border);
        border-radius:      var(--app-menubar-toggled-radius);
        outline:            var(--app-menubar-toggled-outline);
        color:              var(--app-menubar-toggled-text);

        & > img
        {
            filter: var(--app-menubar-toggled-image-filter);
        }
    }
    & .button-active:enabled:hover, & .button-active:enabled:focus
    {
        background-color:   var(--app-menubar-toggled-bg-hover);
        border:             var(--app-menubar-toggled-border-hover);
        border-radius:      var(--app-menubar-toggled-radius-hover);
        outline:            var(--app-menubar-toggled-outline-hover);
        color:              var(--app-menubar-toggled-text-hover);

        & > img
        {
            filter: var(--app-menubar-toggled-image-filter-hover);
        }
    }
    & .button-active:enabled:active
    {
        background-color:   var(--app-menubar-toggled-bg-active);
        border:             var(--app-menubar-toggled-border-active);
        border-radius:      var(--app-menubar-toggled-radius-active);
        outline:            var(--app-menubar-toggled-outline-active);
        color:              var(--app-menubar-toggled-text-active);

        & > img
        {
            filter: var(--app-menubar-toggled-image-filter-active);
        }
    }
    & .button-active:disabled
    {
        background-color:   var(--app-menubar-toggled-bg-disabled);
        border:             var(--app-menubar-toggled-border-disabled);
        border-radius:      var(--app-menubar-toggled-radius-disabled);
        outline:            var(--app-menubar-toggled-outline-disabled);
        color:              var(--app-menubar-toggled-text-disabled);

        & > img
        {
            filter: var(--app-menubar-toggled-image-filter-disabled);
        }
    }

    & > p
    {
        height: 1rem;
        margin: 24px 0px;
    }
    & div
    {
        margin-left: 24px;
    }
`;
const MenuBarButton = styled.button `
`;

const MenuBarSeparator = ({title}) =>
{
    return <>
        <p>{title}</p>
    </>
}

const MenuBarChild = ({
    // ใช้แต่จากแหล่งที่อื่น
    // eslint-disable-next-line no-unused-vars
    state = null, 
    icon, 
    text, 
    onClick,

    style,
    className,
}) =>
{
    return <>
        <MenuBarButton onClick={onClick} style={style} className={className}>
            {icon != null ? <img src={icon}/> : <></>}
            <span>{text}</span>
        </MenuBarButton>
    </>
}
// eslint-disable-next-line no-unused-vars
const MenuBarCondition = ({state, children}) =>
{
    return <>{children}</>;
}
export const MenuBar = ({direction = 'horizontal', state, className, children }) =>
{
    function getState ()
    {
        if (state == null) return null;
        if (state instanceof Array == false) 
        {
            console.warn ("UI/MenuBar: The state attribute isn't an array, the component won't work correctly");
            return null;
        }
        if (state.length < 1)
        {
            console.warn ("UI/MenuBar: The state attirbute contains invalid size, the component won't work correctly");
            return null;
        }

        if (typeof state[0] === 'string') return String (state[0]);
        if (typeof state[0] === 'number') return Number (state[0]);
        if (typeof state[0] === 'boolean') return Boolean (state[0]);

        console.warn ("UI/MenuBar: The state attribute contains invalid getter, the component won't work correctly");
        return null;
    }
    function setState (value)
    {
        if (typeof value !== 'string' &&
            typeof value !== 'number' &&
            typeof value !== 'boolean'
        ) 
        return;

        if (state == null) return;
        if (state instanceof Array == false) 
        {
            console.warn ("UI/MenuBar: The state attribute isn't an array, the component won't work correctly");
            return;
        }
        if (state.length < 2)
        {
            console.warn ("UI/MenuBar: The state attirbute contains invalid size, the component won't work correctly");
            return;
        }
        if (typeof state[1] !== 'function')
        {
            console.warn ("UI/MenuBar: The state attirbute contains invalid setter, the component won't work correctly");
            return;
        }
        state[1] (value);
    }
    function enumerate (element, index)
    {
        if (element == null) return;
        if (index == null) return;

        const property = element.props;

        if ((<MenuBarChild/>).type.name === element.type.name)
        {
            const childState = property.state;
            const childOnClick = property.onClick;

            return React.cloneElement (element, 
            {
                key: index,
                className: [property.className, (getState () === childState) ? 
                  'button-active' : 
                  'button-normal'].join (' '),

                onClick: function (event)
                {
                    event.preventDefault ();
                    event.stopPropagation ();

                    if (getState () === childState)
                        return;

                    setState (childState);

                    if (childOnClick == null)
                        return;

                    if (typeof childOnClick !== 'function') 
                    {
                        console.warn ("UI/MenuBar: The (child) component contains invalid 'onClick' attribute, the event won't be fired");
                        return;
                    }
                    childOnClick (childState);
                }
            });
        }
        if ((<MenuBarCondition/>).type.name === element.type.name)
        {
            if (property.state === true)
            {
                return <Div key={index}>
                    {flattenChildren (property.children).map (enumerate)}
                </Div>
            }
            return;
        }
        if ((<MenuBarSeparator/>).type.name === element.type.name)
        {
            return React.cloneElement (element, { key: index });
        }

        console.warn ("UI/MenuBar: The component contains unknown children element, the component won't work correctly", element);
    }
  
    return <>
        <MenuBarRoot $direction={direction} className={className}>
            { flattenChildren (children).map (enumerate)}
        </MenuBarRoot>
    </>;
}

MenuBar.Child = MenuBarChild;
MenuBar.Separator = MenuBarSeparator;
MenuBar.Condition = MenuBarCondition;

// ==================================================================================================== //
//                                                                                                      //
// MODAL                                                                                                //
//                                                                                                      //
// ==================================================================================================== //

const ModalRoot = styled.div `

    display: block;
    position: absolute; inset: 0;
    overflow: hidden;

    background-color: rgba(0,0,0,0.5);
    width: 100%; height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: var(--app-spacing-1);
    pointer-events: all;
`;
const ModalRootInner = styled.div `

    width: 100%;
    height: 100%;

    min-width: 512px;
    min-height: 420px;

    max-width: 1024px;
    max-height: 768px;

    @media (max-width: 512px)
    {
        min-width: 0;
        min-height: 0;
    }

    overflow: hidden auto;
    
    background-color: var(--app-bg-1);
    border: var(--app-bg-border-1);
    border-radius: var(--app-bg-radius-1);
    padding: var(--app-spacing-2);
`;
const ModalRootContent = styled.div `
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
`;

export const Modal = ({show, children}) =>
{
    return <>
      <ModalRoot style={{ display: show ? 'flex' : 'none' }}>
        <ModalRootInner style={{ display: show ? 'block' : 'none' }}>
            <ModalRootContent>
                {children}
            </ModalRootContent>
        </ModalRootInner>
      </ModalRoot>
    </>
}
const ModalHeader = ({className, children}) =>
{
    return <div className={className}>{children}</div>
}
const ModalBody = ({className, children}) =>
{
    return <div className={className}>{children}</div>
}
const ModalFooter = ({children}) =>
{
    return <div>{children}</div>
}

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;


// ==================================================================================================== //
//                                                                                                      //
// NAVBAR                                                                                               //
//                                                                                                      //
// ==================================================================================================== //


/**
 * 
 * ส่วนประกอบ สำหรับว่างพื้นที่หลักให้กับเมนูนำทาง (navigation bar)
 * 
*/
const NavBarRoot = styled.div `
    position: absolute;
    width: 100%; height: 56px;
    overflow: visible;

    background-color: var(--app-bg-2);
    border: var(--app-bg-border-2);
    border-width: 0px 0px 2px 0px;

    padding-top: 12px;
    padding-bottom: 12px;

    padding-left: 12px;
    padding-right: 12px;
`;
const NavBarRootInner = styled.div `
    margin: 0px auto;
    max-width: 60%;

    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: var(--app-spacing-1);

    align-items: center;
    justify-content: center;

    @media (max-width: 512px) {
      margin: 0;
      max-width: 100%;
    }
`;
export const NavBar = ({children, style}) =>
{
    return <>
      <NavBarRoot style={{ ... style}}>
        <NavBarRootInner>{children}</NavBarRootInner>
      </NavBarRoot>
    </> 
}

/**
 * 
 * ส่วนประกอบที่แสดงโลโก้แบรนด์ หรือ ชื่อผลิตภัณฑ์
 * 
*/
const NavBarBrandingButton = styled.button `
  min-width: 40px;
  min-height: 40px;
  margin: 0;
  padding: 0;

  background-color: transparent;
  color: var(--app-text-1);
  border: none;
  outline: none;
  cursor: pointer;

  &:hover, &:focus {
    background-color: var(--app-button-1-bg-hover);
    border: var(--app-button-1-border-hover);
    border-radius: var(--app-button-1-radius);
    color: var(--app-button-1-text);
  }
  &:active, &:active {
    background-color: var(--app-button-1-bg-active);
    border: var(--app-button-1-border-active);
    border-radius: var(--app-button-1-radius);
    color: var(--app-button-1-text);
  }

  &:hover > img, &:focus > img,
  &:active > img, &:active > img {
    filter: invert();
  }
`;
const NavBarBrandingImage = styled.img `
  pointer-events: none;
  display: inline-block;
  vertical-align: top;
  padding: 4px;
  width: 40px;
  height: 40px;
  object-fit: contain;
`;
const NavBarBrandingText = styled.label `
  pointer-events: none;
  display: inline-block;
  vertical-align: top;
  padding: 2px;
  font-size: 1.5rem;
  font-weight: bold;

  @media (max-width: 768px) {
    display: none;
  }
`;

NavBar.Branding = ({image = icon.people, text = 'NOVA', onClick = null }) =>
{
    return <>
      <NavBarBrandingButton onClick={onClick}>
        <NavBarBrandingImage src={image}/>
        <NavBarBrandingText>{text}</NavBarBrandingText>
      </NavBarBrandingButton>
    </>;
}
/**
 * 
 * ส่วนประกอบที่แสดงช่องค้นหา
 * 
*/
NavBar.Search = ({placeholder, value, onChange }) =>
{
    const [rawGetValue, rawSetValue] = (value != null) ? value : [null, null];

    const getValue = () =>
    {
        if (typeof rawGetValue == 'string')
            return rawGetValue;
          
        return '';
    }
    const setValue = (event) =>
    {
        if (typeof rawSetValue == 'function')
            rawSetValue (event.target.value);

        if (typeof onChange == 'function')
            onChange (event);
    }

    return (
      <div className='search'>
        <input type='search' placeholder={placeholder} value={getValue()} onChange={(event) => setValue(event)}/>
      </div>
    );
}
/**
 * 
 * ส่วนประกอบที่แสดงรายการย่อย
 * 
*/
const NavBarMenuButton = styled.button `
  min-width: 40px;
  min-height: 40px;
  margin: 0;
  padding: 0;

  background-color: transparent;
  color: var(--app-text-1);
  border: none;
  outline: none;
  cursor: pointer;

  &:hover, &:focus {
    background-color: var(--app-button-1-bg-hover);
    border: var(--app-button-1-border-hover);
    border-radius: var(--app-button-1-radius);
    color: var(--app-button-1-text);
  }
  &:active, &:active {
    background-color: var(--app-button-1-bg-active);
    border: var(--app-button-1-border-active);
    border-radius: var(--app-button-1-radius);
    color: var(--app-button-1-text);
  }

  &:hover > img, &:focus > img,
  &:active > img, &:active > img {
    filter: invert();
  }
`;
const NavBarMenuImage = styled.img `
  pointer-events: none;
  display: inline-block;
  vertical-align: top;
  padding: 4px;
  width: 40px;
  height: 40px;
  object-fit: contain;
`;
NavBar.Menu = ({className, style, onClick}) =>
{
  return (
      <NavBarMenuButton className={className} style={style} onClick={onClick}>
        <NavBarMenuImage src={icon.listTask}/>
      </NavBarMenuButton>
    );
}
/**
 *
 * ส่วนประกอบที่แสดงรูปโปรไฟล์ (สามารถกดได้)
 * 
*/
const NavBarProfileButton = styled.button `
  min-width: 40px;
  min-height: 40px;
  margin: 0;
  padding: 0;

  background-color: transparent;
  color: var(--app-text-1);
  border: none;
  outline: none;
  cursor: pointer;

  &:hover, &:focus {
    background-color: var(--app-button-1-bg-hover);
    border: var(--app-button-1-border-hover);
    border-radius: var(--app-button-1-radius);
    color: var(--app-button-1-text);
  }
  &:active, &:active {
    background-color: var(--app-button-1-bg-active);
    border: var(--app-button-1-border-active);
    border-radius: var(--app-button-1-radius);
    color: var(--app-button-1-text);
  }
`;
const NavBarProfileImage = styled.img `
  pointer-events: none;
  display: inline-block;
  vertical-align: top;
  padding: 0px;
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 100%;
  border: var(--app-bg-border-2);

  
  &:enabled:hover,
  &:enabled:active {
    filter: invert();
  }

  &.no-invert,
  &.no-invert:enabled:hover,
  &.no-invert:enabled:active,
  {
    filter: none;
  }
`;

NavBar.Profile = ({image = null, className, children, onClick }) =>
{
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [src, setSrc] = useState (image);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect (() =>
    {
        if (image == null && (auth.isLogged () && auth.isActive ()))
        {
            profile.getPersonal ().then ((x) =>
            {
                let data = decodeContent (x.icon);

                if (data == null || data == "" || data == icon.transparent)
                    data = icon.profile;

                setSrc (data);
            });
        }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

    return (
      <NavBarProfileButton className={className} onClick={onClick}>
        <NavBarProfileImage src={src} className={src != icon.emojiSmile ? 'no-invert' : ''}/>
        {children}
      </NavBarProfileButton>
    );
}
/**
 * 
 * ส่วนประกอบที้ใช้ขยายพื้นที่ให้กับองค์ประกอบย่อย
 * 
*/
const NavBarFlex = styled.div `
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  flex-grow: ${props => props.$grow};
  justify-content: ${props => props.$justify};
  gap: var(--app-spacing-4);
`;

NavBar.Flex = ({justify, grow, children}) =>
{
    return (
      <NavBarFlex $justify={justify} $grow={grow}>{children}</NavBarFlex>
    );
}

const NavBarContextMenu = styled.div `
    position: fixed;
    z-index: 1000;

    margin-top: 12px;

    width: 192px;

    & > button
    {  
        width: 100%;
    }

    & > button,
    & > button:enabled,
    & > button:enabled:hover,
    & > button:enabled:focus,
    & > button:enabled:active,
    & > button:disabled
    {
        border-radius: 0px;
    }
    & > button:first-child,
    & > button:first-child:enabled,
    & > button:first-child:enabled:hover,
    & > button:first-child:enabled:focus,
    & > button:first-child:enabled:active,
    & > button:first-child:disabled
    {
        border-radius:  12px 12px 0px 0px;
    }
    & > button:last-child,
    & > button:last-child:enabled,
    & > button:last-child:enabled:hover,
    & > button:last-child:enabled:focus,
    & > button:last-child:enabled:active,
    & > button:last-child:disabled
    {
        border-radius:  0px 0px 12px 12px;
    }
`

/**
 * 
 * ส่วนประกอบสำหรับเมนูบริบท
 * 
*/
NavBar.ContextMenu = ({className, children}) =>
{
    return (
      <NavBarContextMenu className={className}>
        {children}
      </NavBarContextMenu>
    );
}
NavBar.Login = () =>
{
    return <>
        <Button 
            style={{ width: '96px'}}
            onClick={() => Navigator.auth(window.location.pathname, undefined)}>เข้าสู่ระบบ</Button>
    </>
}


// ==================================================================================================== //
//                                                                                                      //
// TagBar                                                                                               //
//                                                                                                      //
// ==================================================================================================== //

const StyleTagBar = styled.div `
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: var(--app-tagbar-gap);
`;
const StyleTagBarButton = styled.button `

    &.button-normal, &.button-active
    {
        border-radius: var(--app-tagbar-radius);
        padding:       var(--app-tagbar-padding);
        min-width:     var(--app-tagbar-min-width);
        min-height:     var(--app-tagbar-min-height);
    }
    &.button-normal:enabled
    {
        background-color:   var(--app-tagbar-unselected-bg);
        border:             var(--app-tagbar-unselected-border);
        outline:            var(--app-tagbar-unselected-outline);
        color:              var(--app-tagbar-unselected-text);
    }
    &.button-normal:enabled:hover, &.button-normal:enabled:focus
    {
        background-color:   var(--app-tagbar-unselected-bg-hover);
        border:             var(--app-tagbar-unselected-border-hover);
        outline:            var(--app-tagbar-unselected-outline-hover);
        color:              var(--app-tagbar-unselected-text-hover);
    }
    &.button-normal:enabled:active
    {
        background-color:   var(--app-tagbar-unselected-bg-active);
        border:             var(--app-tagbar-unselected-border-active);
        outline:            var(--app-tagbar-unselected-outline-active);
        color:              var(--app-tagbar-unselected-text-active);
    }
    &.button-normal:disabled
    {
        background-color:   var(--app-tagbar-unselected-bg-disabled);
        border:             var(--app-tagbar-unselected-border-disabled);
        outline:            var(--app-tagbar-unselected-outline-disabled);
        color:              var(--app-tagbar-unselected-text-disabled);
    }

    &.button-active:enabled
    {
        background-color:   var(--app-tagbar-selected-bg);
        border:             var(--app-tagbar-selected-border);
        outline:            var(--app-tagbar-selected-outline);
        color:              var(--app-tagbar-selected-text);
    }
    &.button-active:enabled:hover, &.button-active:enabled:focus
    {
        background-color:   var(--app-tagbar-selected-bg-hover);
        border:             var(--app-tagbar-selected-border-hover);
        outline:            var(--app-tagbar-selected-outline-hover);
        color:              var(--app-tagbar-selected-text-hover);
    }
    &.button-active:enabled:active
    {
        background-color:   var(--app-tagbar-selected-bg-active);
        border:             var(--app-tagbar-selected-border-active);
        outline:            var(--app-tagbar-selected-outline-active);
        color:              var(--app-tagbar-selected-text-active);
    }
    &.button-active:disabled
    {
        background-color:   var(--app-tagbar-selected-bg-disabled);
        border:             var(--app-tagbar-selected-border-disabled);
        outline:            var(--app-tagbar-selected-outline-disabled);
        color:              var(--app-tagbar-selected-text-disabled);
    }
`;

function TagBarChild ({icon, text, className, onClick})
{
    return (
      <StyleTagBarButton className={className} onClick={onClick}>
        {icon != null ? <img src={icon}/> : <></>}
        {text != null ? <span>{text}</span> : <></>}
      </StyleTagBarButton>
    )
}
function TagBarSeparator ()
{
    return (
      <div></div>
    )
}
// eslint-disable-next-line no-unused-vars
function TagBarCondition ({state, children})
{
    return <>{children}</>;
}
export function TagBar ({state, className, children})
{
    function getState ()
    {
        if (state == null) return [];
        if (state instanceof Array == false) 
        {
            console.warn ("UI/TagBar: The state attribute isn't an array, the component won't work correctly");
            return [];
        }
        if (state.length < 1)
        {
            console.warn ("UI/TagBar: The state attirbute contains invalid size, the component won't work correctly");
            return [];
        }

        if (Array.isArray (state[0]))
        {
            return state[0];
        }
        console.warn ("UI/TagBar: The state attribute contains invalid getter, the component won't work correctly");
        return [];
    }
    function setState (value)
    {
        if (typeof value !== 'object')
        {
            return;
        }
        if (state == null) return;
        if (state instanceof Array == false) 
        {
            console.warn ("UI/TagBar: The state attribute isn't an array, the component won't work correctly");
            return;
        }
        if (state.length < 2)
        {
            console.warn ("UI/TagBar: The state attirbute contains invalid size, the component won't work correctly");
            return;
        }
        if (typeof state[1] !== 'function')
        {
            console.warn ("UI/MenuBar: The state attirbute contains invalid setter, the component won't work correctly");
            return;
        }
        state[1] (value);
    }
    const enumerate = (element, index) =>
    {
        if (element == null) return;
        if (index == null) return;

        const property = element.props;

        if ((<TagBarChild/>).type === element.type)
        {
            const childState = property.state;
            const childOnClick = property.onClick;

            return React.cloneElement (element, 
            {
                key: index,
                className: [property.className, (getState ().includes (childState)) ? 
                  'button-active' : 
                  'button-normal'].join (' '),

                onClick: function (event)
                {
                    event.preventDefault ();
                    event.stopPropagation ();

                    const resultOld = getState ();
                    const result = resultOld.includes (childState) ? 
                                   resultOld.filter(x => x != childState) : 
                                   [ ... resultOld, childState];

                    setState (result);

                    if (childOnClick == null)
                        return;

                    if (typeof childOnClick !== 'function') 
                    {
                        console.warn ("UI/TagBar: The (child) component contains invalid 'onClick' attribute, the event won't be fired");
                        return;
                    }
                    childOnClick (childState);
                }
            });
        }
        if ((<TagBarCondition/>).type.name === element.type.name)
        {
            if (property.state === true)
            {
                return <Div key={index}>
                    {flattenChildren (property.children).map (enumerate)}
                </Div>
            }
            return;
        }
        if ((<TagBarSeparator/>).type.name === element.type.name)
        {
            return React.cloneElement (element, { key: index });
        }
        console.warn ("UI/TagBar: The component contains unknown children element, the component won't work correctly", element);
    }

    return <>
      <StyleTagBar className={className}>
        {children.map (enumerate)}
      </StyleTagBar>
    </>
}
TagBar.Child = TagBarChild;
TagBar.Separator = TagBarSeparator;
TagBar.Condition = TagBarCondition;

// ==================================================================================================== //
//                                                                                                      //
// NAVBAR                                                                                               //
//                                                                                                      //
// ==================================================================================================== //

const StyleVisOpt = styled.div `

    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;

    & > button
    {
        min-width: 40px;
        min-height: 40px;

        margin: 0px !important;
        padding: 0px !important;

        border: var(--app-border-1);
        border-radius: var(--app-button-1-radius);
    }
    & > button:first-child
    {
        border-radius: 
            var(--app-button-1-radius)
            0px
            0px
            var(--app-button-1-radius);
    }
    & > button:last-child
    {
        border-radius: 
            0px
            var(--app-button-1-radius)
            var(--app-button-1-radius)
            0px;
    }
    & > button > img
    {
        width: 32px;
        height: 32px;
        padding: 4px;
        pointer-events: none;
    }

    & .normal
    {
        background-color: var(--app-button-1-bg-active);
    }
    & .normal > img
    {
        filter: invert();
        opacity: 0.5;
    }
    & .active
    {
        background-color: var(--app-button-1-bg);
    }
    & .active > img
    {
        filter: invert();
        opacity: 1.0;
    }
`;

export function VisOpt ({
    state = [], 
    showPublic = true, 
    showFriend = false,
    showEmployer = false,
    showPrivate = true,
    onChange = () => {},
})
{
    function getValue (which)
    {
        if (Array.isArray (state) && state.length >= 1)
        {
            return state[0] == which ? 'active' : 'normal'; 
        }
        return 'normal';
    }
    function setValue (which)
    {
        if (Array.isArray (state) && state.length >= 2)
        {
            state[1] (which);
        }
        if (typeof onChange == 'function')
        {
            onChange (which);
        }
    }

    const VALUE_PUBLIC    = profile.VISIBILITY_PUBLIC;
    const VALUE_EMPLOYER  = profile.VISIBILITY_FRIEND;
    const VALUE_FRIEND    = profile.VISIBILITY_FRIEND;
    const VALUE_PRIVATE   = profile.VISIBILITY_PRIVATE;

    return (
      <StyleVisOpt>
        <Activity mode={showPublic ? 'visible' : 'hidden'}>
          <button title="มองเห็นได้ทุกคน" 
                  className={getValue (VALUE_PUBLIC)} 
                  onClick={() => setValue (VALUE_PUBLIC)}>
            <img src={icon.people}></img>
          </button>
        </Activity>
        <Activity mode={showEmployer ? 'visible' : 'hidden'}>
          <button title="มองเห็นได้เฉพาะนางจ้าง" 
                  className={getValue (VALUE_EMPLOYER)}
                  onClick={() => setValue (VALUE_EMPLOYER)}>
            <img src={icon.plusCircle}></img>
          </button>
        </Activity>
        <Activity mode={showFriend ? 'visible' : 'hidden'}>
          <button title="มองเห็นได้เฉพาะเพื่อน" 
                  className={getValue (VALUE_FRIEND)}
                  onClick={() => setValue (VALUE_FRIEND)}>
            <img src={icon.people}></img>
          </button>
        </Activity>
        <Activity mode={showPrivate ? 'visible' : 'hidden'}>
          <button title="ปิดการมองเห็น"
                  className={getValue (VALUE_PRIVATE)}
                  onClick={() => setValue (VALUE_PRIVATE)}>
            <img src={icon.person}></img>
          </button>
        </Activity>
      </StyleVisOpt>
    );
}