import { useParams, useNavigate } from 'react-router-dom';
import { useOrganizations } from '@/shared/hooks';

export const OrganizationDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getOrganizationById } = useOrganizations();

  const organization = getOrganizationById(Number(id));

  if (!organization) {
    return (
      <div>
        <h1>Organization not found</h1>
        <p>Organization with ID {id} does not exist.</p>
        <button onClick={() => navigate('/organizations')}>Back to list</button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => navigate('/organizations')}>← Back to list</button>

      <div>
        <h1>{organization.title}</h1>

        <div>
          <div>
            <h3>Agreement Number</h3>
            <p>{organization.agreementNumber}</p>
          </div>

          <div>
            <h3>Agreement Date</h3>
            <p>{organization.agreementDay}</p>
          </div>

          <div>
            <h3>Business Entity</h3>
            <p>{organization.businessEntity}</p>
          </div>

          <div>
            <h3>Company Type</h3>
            <p>{organization.companyType}</p>
          </div>

          <div>
            <h3>Responsible Person</h3>
            <p>{organization.responsiblePerson}</p>
          </div>

          <div>
            <h3>Phone</h3>
            <p>{organization.phone}</p>
          </div>

          <div>
            <h3>Email</h3>
            <p>{organization.email}</p>
          </div>
        </div>

        {organization.photos && organization.photos.length > 0 && (
          <div>
            <h3>Photos</h3>
            <div>
              {organization.photos.map((photo, index) => {
                const isLocalImage = photo.startsWith('/src/assets/');

                if (isLocalImage) {
                  return (
                    <img
                      key={index}
                      src={photo}
                      alt={`${organization.title} - Photo ${index + 1}`}
                    />
                  );
                }

                return (
                  <div key={index}>
                    Photo {index + 1}
                    <br />
                    <span>{photo.split('/').pop()}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
