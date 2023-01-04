package com.myrh.services;

import com.myrh.models.Offer;
import com.myrh.repositories.OfferRepository;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Repository
public class OfferService {
    private final OfferRepository offerRepository;

    public OfferService(OfferRepository offerRepository) {
        this.offerRepository = offerRepository;
    }

    public List<Offer> listAll(){
        return offerRepository.findAll();
    }

    public Offer getOfferById(Long id){
        Optional offer = offerRepository.findById(id);
        return offer.isPresent() ? (Offer) offer.get() : null;
    }

    public Offer save(Offer offer){
        return offerRepository.save(offer);
    }

    public void updateOffer(Long id, Offer offer){
        // ...
    }

    public List<Offer> getOffersByCompany(Long companyId){
        return offerRepository.findAllByCompanyId(companyId);
    }
}
