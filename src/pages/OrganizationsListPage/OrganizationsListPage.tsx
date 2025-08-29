import { useNavigate } from 'react-router-dom';
import { useOrganizations } from '@/shared/hooks';

export const OrganizationsListPage = () => {
  const navigate = useNavigate();
  const { organizations } = useOrganizations();

  const handleOrganizationClick = (organizationId: number) => {
    navigate(`/organizations/${organizationId}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Organizations</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {organizations.map((organization) => (
          <div
            key={organization.id}
            onClick={() => handleOrganizationClick(organization.id)}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f5f5f5';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#fff';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <h3 style={{ margin: '0 0 8px 0', color: '#333' }}>
              {organization.title}
            </h3>
            <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>
              {organization.companyType} • {organization.businessEntity}
            </p>
            <div style={{ fontSize: '12px', color: '#888' }}>
              <div>Agreement: {organization.agreementNumber}</div>
              <div>Date: {organization.agreementDay}</div>
              <div>Contact: {organization.responsiblePerson}</div>
              <div>{organization.phone}</div>
              <div>{organization.email}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
