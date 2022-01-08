import Link from 'next/link';

export default function Option({ optionStyle, href, children }) {
  return (
    <div className="dropdown__option">
      <Link href={href} passHref>
        <div className={(!optionStyle) ? `dropdown__link necessaryStyling` : `necessaryStyling ${optionStyle}`}>
          {children}
        </div>
      </Link>
      <style jsx>{`
        .dropdown__option{
          /* border: 2px solid red; */
        }
        
        .dropdown__link {
          padding: 0.5rem 1rem;
          textTransform: capitalize;
          background-color: #e82428;
          border-bottom: 1px solid white;
          color: white;
        }

        .dropdown__link:last-child {
          border-bottom: 0;
        }

        .necessaryStyling{
          display: block;
          height: 100%;
        }

        .dropdown__link:hover{
          background-color: #b81c1e;
        }
      `}</style>
      <style jsx global>{`
       
      `}</style>
    </div >
  )
}

