CREATE TABLE site_settings (
    id BIGSERIAL PRIMARY KEY,
    allowed_fulfillment_method VARCHAR(50) NOT NULL DEFAULT 'BOTH'
);

-- Insert a default row so we always have ID=1
INSERT INTO site_settings (id, allowed_fulfillment_method) VALUES (1, 'BOTH') ON CONFLICT DO NOTHING;
