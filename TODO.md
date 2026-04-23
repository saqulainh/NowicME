# Booking + Services Enhancement TODO

## Booking updates
- [x] Review booking API client payload handling (`frontend/src/lib/api.js`)
- [x] Update `frontend/src/pages/Booking.jsx`:
- [x] Add contact inputs for email and mobile number in booking step
- [x] Add validation for email/mobile before booking submit
- [x] Send email/mobile in booking payload
- [x] Show email/mobile in booking confirmation UI
- [x] Reset new fields on booking reset
- [x] Run a quick sanity check for build/runtime issues

## Services performance/image fixes
- [ ] Improve image URL resolution with local fallbacks
- [ ] Add lazy loading + async decode + onError fallback for service images
- [ ] Keep API/fallback service mapping compatible
- [ ] Run sanity build after services changes
